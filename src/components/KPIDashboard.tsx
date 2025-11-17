/**
 * KPI Dashboard Component
 * Brandscaling Design Guidelines Section 15
 * 
 * Cards: LSI sparkline, Velocity histogram, Leverage donut, Resonance line
 * 4-up desktop, 2-up tablet, 1-up mobile
 * Filters by timeframe, tier, cohort
 */

import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface KPIMetric {
  id: string;
  label: string;
  value: number | string;
  previousValue?: number;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  chartType: 'sparkline' | 'histogram' | 'donut' | 'line';
  chartData: number[];
  color: string;
}

interface KPIDashboardProps {
  persona?: 'architect' | 'alchemist';
}

export function KPIDashboard({ persona = 'architect' }: KPIDashboardProps) {
  const [timeframe, setTimeframe] = useState('30d');
  const [tier, setTier] = useState('all');
  const [cohort, setCohort] = useState('all');

  // Mock KPI data
  const metrics: KPIMetric[] = [
    {
      id: 'lsi',
      label: 'Learning Speed Index',
      value: 7.8,
      previousValue: 6.5,
      change: 20,
      changeType: 'increase',
      chartType: 'sparkline',
      chartData: [6.2, 6.5, 6.8, 7.1, 7.4, 7.6, 7.8],
      color: 'var(--bs-color-indigo)'
    },
    {
      id: 'velocity',
      label: 'Completion Velocity',
      value: '85%',
      previousValue: 78,
      change: 9,
      changeType: 'increase',
      chartType: 'histogram',
      chartData: [65, 72, 78, 82, 85, 88, 85],
      color: 'var(--bs-color-orange)'
    },
    {
      id: 'leverage',
      label: 'AI Leverage Score',
      value: '92%',
      previousValue: 85,
      change: 8,
      changeType: 'increase',
      chartType: 'donut',
      chartData: [92, 8],
      color: 'var(--bs-color-plum)'
    },
    {
      id: 'resonance',
      label: 'Content Resonance',
      value: 8.4,
      previousValue: 8.1,
      change: 4,
      changeType: 'increase',
      chartType: 'line',
      chartData: [7.8, 7.9, 8.0, 8.1, 8.2, 8.3, 8.4],
      color: 'var(--bs-color-pink)'
    }
  ];

  return (
    <div className="section-padding-bs">
      <div className="container-bs-desktop">
        {/* Header */}
        <div className="mb-12">
          <h2 className="typo-h2-bs mb-6">Performance Dashboard</h2>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="w-full sm:w-auto">
              <label className="typo-caption-bs text-gray-600 block mb-2">
                Timeframe
              </label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full sm:w-auto">
              <label className="typo-caption-bs text-gray-600 block mb-2">
                Tier
              </label>
              <Select value={tier} onValueChange={setTier}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tiers</SelectItem>
                  <SelectItem value="discovery">Discovery</SelectItem>
                  <SelectItem value="awareness">Awareness</SelectItem>
                  <SelectItem value="entry">Entry</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                  <SelectItem value="elite">Elite</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full sm:w-auto">
              <label className="typo-caption-bs text-gray-600 block mb-2">
                Cohort
              </label>
              <Select value={cohort} onValueChange={setCohort}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select cohort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cohorts</SelectItem>
                  <SelectItem value="architect">Architects</SelectItem>
                  <SelectItem value="alchemist">Alchemists</SelectItem>
                  <SelectItem value="blurred">Blurred</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <KPICard key={metric.id} metric={metric} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface KPICardProps {
  metric: KPIMetric;
}

function KPICard({ metric }: KPICardProps) {
  const getTrendIcon = () => {
    if (!metric.changeType) return null;
    
    if (metric.changeType === 'increase') {
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    } else if (metric.changeType === 'decrease') {
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    } else {
      return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTrendColor = () => {
    if (!metric.changeType) return 'text-gray-600';
    
    if (metric.changeType === 'increase') {
      return 'text-green-600';
    } else if (metric.changeType === 'decrease') {
      return 'text-red-600';
    } else {
      return 'text-gray-600';
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="typo-caption-bs text-gray-600 mb-1">
            {metric.label}
          </p>
          <h3 className="typo-h3-bs" style={{ color: metric.color }}>
            {metric.value}
          </h3>
        </div>
        {metric.change !== undefined && (
          <div className={`flex items-center gap-1 ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="typo-caption-bs font-medium">
              {metric.change > 0 ? '+' : ''}{metric.change}%
            </span>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="h-20">
        {metric.chartType === 'sparkline' && (
          <Sparkline data={metric.chartData} color={metric.color} />
        )}
        {metric.chartType === 'histogram' && (
          <Histogram data={metric.chartData} color={metric.color} />
        )}
        {metric.chartType === 'donut' && (
          <DonutChart data={metric.chartData} color={metric.color} />
        )}
        {metric.chartType === 'line' && (
          <LineChart data={metric.chartData} color={metric.color} />
        )}
      </div>
    </Card>
  );
}

// Simple chart components
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function Histogram({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  
  return (
    <div className="flex items-end justify-between h-full gap-1">
      {data.map((value, index) => (
        <div
          key={index}
          className="flex-1 rounded-t"
          style={{
            height: `${(value / max) * 100}%`,
            backgroundColor: color,
            opacity: 0.8
          }}
        />
      ))}
    </div>
  );
}

function DonutChart({ data, color }: { data: number[]; color: string }) {
  const [value, remaining] = data;
  const circumference = 2 * Math.PI * 40;
  const strokeDasharray = `${(value / 100) * circumference} ${circumference}`;

  return (
    <div className="flex items-center justify-center h-full">
      <svg className="w-20 h-20 -rotate-90">
        {/* Background circle */}
        <circle
          cx="40"
          cy="40"
          r="35"
          fill="none"
          stroke="rgba(0, 0, 0, 0.05)"
          strokeWidth="10"
        />
        {/* Progress circle */}
        <circle
          cx="40"
          cy="40"
          r="35"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function LineChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      {/* Area fill */}
      <polygon
        points={`0,100 ${points} 100,100`}
        fill={color}
        opacity="0.1"
      />
      {/* Line */}
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default KPIDashboard;
