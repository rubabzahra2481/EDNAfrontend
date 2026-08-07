import React, { useCallback, useEffect, useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  Folder,
  PlayCircle,
  RefreshCw,
  Video,
} from 'lucide-react';
import { BACKEND_URL } from '../config';
import { supabase } from '../utils/supabase/client';
import { toVimeoEmbed } from '../utils/vimeo';

/**
 * Zoom Recordings — website port of the iOS app feature.
 * Categories (Deal Clinic / Mastermind Days) → monthly folders → recordings → player.
 * Read-only; content is fed by the backend's Vimeo auto-sync.
 */

interface ZoomCategory {
  category: string;
  label: string;
  folderCount: number;
  recordingCount: number;
}

interface ZoomFolder {
  id: string;
  category: string;
  title: string;
  periodMonth: string | null;
  description: string | null;
  displayOrder: number;
  videoCount: number;
  documentCount: number;
}

interface ZoomItem {
  id: string;
  itemType: 'video' | 'document';
  title: string | null;
  vimeoUrl: string | null;
  fileId: string | null;
  displayOrder: number;
}

interface ZoomRecording {
  id: string;
  title: string;
  description: string | null;
  recordedOn: string | null;
  displayOrder: number;
  items: ZoomItem[];
}

type Level =
  | { name: 'categories' }
  | { name: 'folders'; category: ZoomCategory }
  | { name: 'folder'; category: ZoomCategory; folder: ZoomFolder }
  | { name: 'recording'; category: ZoomCategory; folder: ZoomFolder; recording: ZoomRecording };

const CATEGORY_STYLES: Record<string, { gradient: string; icon: string }> = {
  deal_clinic: { gradient: 'linear-gradient(135deg, #42047d 0%, #8B5CF6 100%)', icon: '#8B5CF6' },
  mastermind: { gradient: 'linear-gradient(135deg, #f6782f 0%, #F97316 100%)', icon: '#F97316' },
};

function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

async function zoomFetch<T>(path: string): Promise<T> {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;
  if (!token) throw new Error('Please sign in to view recordings.');
  const res = await fetch(`${BACKEND_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.success === false) {
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return body as T;
}

export function ZoomRecordings() {
  const [level, setLevel] = useState<Level>({ name: 'categories' });
  const [categories, setCategories] = useState<ZoomCategory[]>([]);
  const [folders, setFolders] = useState<ZoomFolder[]>([]);
  const [recordings, setRecordings] = useState<ZoomRecording[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await zoomFetch<{ categories: ZoomCategory[] }>('/api/v1/zoom/categories');
      setCategories(data.categories);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const openCategory = async (category: ZoomCategory) => {
    setLevel({ name: 'folders', category });
    setLoading(true);
    setError(null);
    try {
      const data = await zoomFetch<{ folders: ZoomFolder[] }>(
        `/api/v1/zoom/folders?category=${encodeURIComponent(category.category)}`
      );
      setFolders(data.folders);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const openFolder = async (category: ZoomCategory, folder: ZoomFolder) => {
    setLevel({ name: 'folder', category, folder });
    setLoading(true);
    setError(null);
    try {
      const data = await zoomFetch<{ recordings: ZoomRecording[] }>(
        `/api/v1/zoom/folders/${folder.id}`
      );
      setRecordings(data.recordings);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const openRecording = (category: ZoomCategory, folder: ZoomFolder, recording: ZoomRecording) => {
    setLevel({ name: 'recording', category, folder, recording });
  };

  const goBack = () => {
    setError(null);
    if (level.name === 'recording') {
      setLevel({ name: 'folder', category: level.category, folder: level.folder });
    } else if (level.name === 'folder') {
      openCategory(level.category);
    } else if (level.name === 'folders') {
      setLevel({ name: 'categories' });
      loadCategories();
    }
  };

  const header = (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3 min-w-0">
        {level.name !== 'categories' && (
          <button
            onClick={goBack}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
        )}
        <div className="min-w-0">
          <h1
            className="text-2xl font-bold truncate"
            style={{
              backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {level.name === 'categories' && 'Zoom Recordings'}
            {level.name === 'folders' && level.category.label}
            {level.name === 'folder' && level.folder.title}
            {level.name === 'recording' && level.recording.title}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5 truncate">
            {level.name === 'categories' && 'Recorded Deal Clinics and Mastermind Days'}
            {level.name === 'folders' && 'Browse by month'}
            {level.name === 'folder' && level.category.label}
            {level.name === 'recording' &&
              (formatDate(level.recording.recordedOn) || level.folder.title)}
          </p>
        </div>
      </div>
    </div>
  );

  const renderBody = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-24 text-gray-500">
          <RefreshCw className="w-8 h-8 animate-spin mb-3" style={{ color: '#8B5CF6' }} />
          <p className="text-sm">Loading…</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-24 text-center px-4">
          <p className="text-gray-700 font-medium mb-2">Couldn't load recordings</p>
          <p className="text-sm text-gray-500 mb-6">{error}</p>
          <button
            onClick={() => {
              if (level.name === 'categories') loadCategories();
              else if (level.name === 'folders') openCategory(level.category);
              else if (level.name === 'folder') openFolder(level.category, level.folder);
            }}
            className="px-5 py-2.5 rounded-lg text-white font-medium"
            style={{ background: 'linear-gradient(to right, #8B5CF6 0%, #F97316 100%)' }}
          >
            Try again
          </button>
        </div>
      );
    }

    if (level.name === 'categories') {
      return (
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
          {categories.map((cat) => {
            const style = CATEGORY_STYLES[cat.category] || CATEGORY_STYLES.deal_clinic;
            return (
              <button
                key={cat.category}
                onClick={() => openCategory(cat)}
                className="text-left rounded-2xl p-6 text-white shadow-md hover:shadow-xl transition-shadow"
                style={{ background: style.gradient }}
              >
                <Video className="w-8 h-8 mb-4 opacity-90" />
                <h3 className="text-xl font-semibold mb-1">{cat.label}</h3>
                <p className="text-sm opacity-80">
                  {cat.folderCount} {cat.folderCount === 1 ? 'folder' : 'folders'} ·{' '}
                  {cat.recordingCount} {cat.recordingCount === 1 ? 'recording' : 'recordings'}
                </p>
              </button>
            );
          })}
        </div>
      );
    }

    if (level.name === 'folders') {
      if (folders.length === 0) {
        return (
          <div className="py-24 text-center text-gray-500">
            <Folder className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No recordings published yet — check back soon.</p>
          </div>
        );
      }
      const iconColor = (CATEGORY_STYLES[level.category.category] || CATEGORY_STYLES.deal_clinic).icon;
      return (
        <div className="space-y-3 max-w-3xl">
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => openFolder(level.category, folder)}
              className="w-full flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-5 py-4 hover:border-gray-300 hover:shadow-sm transition-all text-left"
            >
              <Folder className="w-6 h-6 flex-shrink-0" style={{ color: iconColor }} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{folder.title}</p>
                <p className="text-sm text-gray-500">
                  {folder.videoCount} {folder.videoCount === 1 ? 'video' : 'videos'}
                  {folder.description ? ` · ${folder.description}` : ''}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </button>
          ))}
        </div>
      );
    }

    if (level.name === 'folder') {
      if (recordings.length === 0) {
        return (
          <div className="py-24 text-center text-gray-500">
            <PlayCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No recordings in this folder yet.</p>
          </div>
        );
      }
      return (
        <div className="space-y-3 max-w-3xl">
          {recordings.map((rec) => {
            const date = formatDate(rec.recordedOn);
            return (
              <button
                key={rec.id}
                onClick={() => openRecording(level.category, level.folder, rec)}
                className="w-full flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-5 py-4 hover:border-gray-300 hover:shadow-sm transition-all text-left"
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #42047d 0%, #f6782f 100%)' }}
                >
                  <PlayCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{rec.title}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1.5">
                    {date && (
                      <>
                        <Calendar className="w-3.5 h-3.5" />
                        {date}
                      </>
                    )}
                    {!date && `${rec.items.filter((i) => i.itemType === 'video').length} video`}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </button>
            );
          })}
        </div>
      );
    }

    // recording player
    const videos = level.recording.items.filter((i) => i.itemType === 'video' && i.vimeoUrl);
    return (
      <div className="max-w-4xl space-y-6">
        {videos.length === 0 && (
          <div className="py-24 text-center text-gray-500">
            <Video className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>This recording has no playable video.</p>
          </div>
        )}
        {videos.map((item) => {
          const embed = toVimeoEmbed(item.vimeoUrl);
          return (
            <div key={item.id} className="space-y-2">
              {item.title && <p className="font-medium text-gray-800">{item.title}</p>}
              {embed ? (
                <div
                  className="relative w-full rounded-xl overflow-hidden bg-black shadow-md"
                  style={{ paddingBottom: '56.25%' }}
                >
                  <iframe
                    src={embed.src}
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 0 }}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={item.title || level.recording.title}
                  />
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  This video can't be embedded.{' '}
                  {item.vimeoUrl && (
                    <a
                      href={item.vimeoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Open on Vimeo
                    </a>
                  )}
                </p>
              )}
            </div>
          );
        })}
        {level.recording.description && (
          <p className="text-gray-600 text-sm leading-relaxed">{level.recording.description}</p>
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {header}
        {renderBody()}
      </div>
    </div>
  );
}
