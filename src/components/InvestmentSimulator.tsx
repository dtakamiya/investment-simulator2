'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  BarElement,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Chart.jsの登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// 資産運用シミュレーターコンポーネント
export default function InvestmentSimulator() {
  // 入力値のstate
  const [initialInvestment, setInitialInvestment] = useState<number>(1000000);
  const [monthlyContributionInTenThousand, setMonthlyContributionInTenThousand] = useState<number>(3);
  const [annualReturnRate, setAnnualReturnRate] = useState<number>(5);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(30);
  
  // シミュレーション結果のstate
  const [simulationResults, setSimulationResults] = useState<{
    labels: string[];
    totalAmounts: number[];
    investedAmounts: number[];
    interestAmounts: number[];
  }>({
    labels: [],
    totalAmounts: [],
    investedAmounts: [],
    interestAmounts: []
  });

  // シミュレーション計算関数
  const calculateInvestment = useCallback(() => {
    const labels: string[] = [];
    const totalAmounts: number[] = [];
    const investedAmounts: number[] = [];
    const interestAmounts: number[] = [];

    // 万単位から実際の金額に変換
    const monthlyContribution = monthlyContributionInTenThousand * 10000;

    // 月利に変換
    const monthlyReturnRate = (annualReturnRate / 100) / 12;
    
    // 初期値
    let currentTotal = initialInvestment;
    let totalInvested = initialInvestment;
    
    // 初期値を配列に追加
    labels.push('0年目');
    totalAmounts.push(currentTotal);
    investedAmounts.push(totalInvested);
    interestAmounts.push(0);
    
    // 各年ごとの計算
    for (let year = 1; year <= investmentPeriod; year++) {
      // 12ヶ月分の計算
      for (let month = 1; month <= 12; month++) {
        // 月々の積立を追加
        currentTotal += monthlyContribution;
        totalInvested += monthlyContribution;
        
        // 利息を計算して追加
        const monthlyInterest = currentTotal * monthlyReturnRate;
        currentTotal += monthlyInterest;
      }
      
      // 年ごとの結果を配列に追加
      labels.push(`${year}年目`);
      totalAmounts.push(Math.round(currentTotal));
      investedAmounts.push(Math.round(totalInvested));
      interestAmounts.push(Math.round(currentTotal - totalInvested));
    }
    
    // 結果をstateに設定
    setSimulationResults({
      labels,
      totalAmounts,
      investedAmounts,
      interestAmounts
    });
  }, [initialInvestment, monthlyContributionInTenThousand, annualReturnRate, investmentPeriod]);

  // 入力値が変更されたらシミュレーションを再計算
  useEffect(() => {
    calculateInvestment();
  }, [calculateInvestment]);

  // 万単位から実際の金額に変換
  const monthlyContribution = monthlyContributionInTenThousand * 10000;

  // グラフデータ
  const chartData = {
    labels: simulationResults.labels,
    datasets: [
      {
        label: '総資産額',
        data: simulationResults.totalAmounts,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
      },
      {
        label: '投資元本',
        data: simulationResults.investedAmounts,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.05)',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
      }
    ],
  };

  // グラフオプション
  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 14,
            family: "'Geist', sans-serif",
          },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20
        }
      },
      title: {
        display: true,
        text: '資産運用シミュレーション結果',
        font: {
          size: 18,
          family: "'Geist', sans-serif",
          weight: 'bold'
        },
        padding: {
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        bodyColor: '#1f2937',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        titleFont: {
          size: 14,
          family: "'Geist', sans-serif",
        },
        bodyFont: {
          size: 14,
          family: "'Geist', sans-serif",
        },
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('ja-JP', {
                style: 'currency',
                currency: 'JPY',
                maximumFractionDigits: 0
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            // 万単位に変換して表示
            const valueInTenThousand = Number(value) / 10000;
            if (valueInTenThousand >= 1) {
              return valueInTenThousand.toLocaleString('ja-JP') + '万円';
            } else {
              return '0円';
            }
          },
          font: {
            size: 12,
            family: "'Geist', sans-serif",
          },
          padding: 8
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12,
            family: "'Geist', sans-serif",
          },
          padding: 8
        }
      }
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 7,
      },
      line: {
        borderWidth: 3
      }
    }
  };

  // 数値をフォーマットする関数
  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0
    }).format(value);
  }, []);

  // 投資利回りの計算
  const calculateROI = useCallback(() => {
    const totalInvestment = simulationResults.investedAmounts[simulationResults.investedAmounts.length - 1] || 0;
    const totalReturn = simulationResults.interestAmounts[simulationResults.interestAmounts.length - 1] || 0;
    
    if (totalInvestment === 0) return 0;
    return (totalReturn / totalInvestment) * 100;
  }, [simulationResults.investedAmounts, simulationResults.interestAmounts]);

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent mb-2">
          資産運用シミュレーター
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          初期投資額、毎月の積立額、年利、積立期間を入力して、将来の資産成長をシミュレーションしましょう。
        </p>
      </div>
      
      {/* 入力フォーム */}
      <div className="bg-white shadow-xl rounded-2xl p-8 mb-10 border border-gray-100">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          シミュレーション設定
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 初期投資額 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              初期投資額
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-700 font-medium">¥</span>
              </div>
              <input
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
                className="w-full pl-8 pr-3 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all text-gray-800 font-medium text-center"
                min="0"
              />
            </div>
            <p className="text-xs text-gray-600">最初に投資する金額</p>
          </div>
          
          {/* 毎月の積立額（万円単位） */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              毎月の積立額
            </label>
            <div className="relative mt-1">
              <input
                type="number"
                value={monthlyContributionInTenThousand}
                onChange={(e) => setMonthlyContributionInTenThousand(Number(e.target.value))}
                className="w-full pr-12 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all text-gray-800 font-medium text-center"
                min="0"
                step="0.1"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-700 font-medium">万円</span>
              </div>
            </div>
            <p className="text-xs text-gray-600">毎月追加で投資する金額（{formatCurrency(monthlyContribution)}）</p>
          </div>
          
          {/* 年利 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              年利
            </label>
            <div className="relative mt-1">
              <input
                type="number"
                value={annualReturnRate}
                onChange={(e) => setAnnualReturnRate(Number(e.target.value))}
                className="w-full pr-8 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all text-gray-800 font-medium text-center"
                min="0"
                step="0.1"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-700 font-medium">%</span>
              </div>
            </div>
            <p className="text-xs text-gray-600">年間の期待リターン率</p>
          </div>
          
          {/* 積立期間 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              積立期間
            </label>
            <div className="relative mt-1">
              <input
                type="number"
                value={investmentPeriod}
                onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                className="w-full pr-8 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all text-gray-800 font-medium text-center"
                min="1"
                max="100"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-700 font-medium">年</span>
              </div>
            </div>
            <p className="text-xs text-gray-600">投資を続ける年数</p>
          </div>
        </div>
      </div>
      
      {/* シミュレーション結果 */}
      <div className="bg-white shadow-xl rounded-2xl p-8 mb-10 border border-gray-100">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707L15.414 5a1 1 0 11-1.414 1.414L12.5 4.914l-.707.707a1 1 0 01-1.414-1.414l.707-.707L12.5 2.207A1 1 0 0112 2z" clipRule="evenodd" />
            <path d="M15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
          </svg>
          シミュレーション結果
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100">
            <p className="text-sm text-indigo-600 font-medium mb-1">最終的な資産総額</p>
            <p className="text-2xl font-bold text-indigo-700">
              {formatCurrency(simulationResults.totalAmounts[simulationResults.totalAmounts.length - 1] || 0)}
            </p>
            <div className="mt-2 text-xs text-indigo-500">
              {investmentPeriod}年後の予想金額
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-100">
            <p className="text-sm text-emerald-600 font-medium mb-1">投資元本</p>
            <p className="text-2xl font-bold text-emerald-700">
              {formatCurrency(simulationResults.investedAmounts[simulationResults.investedAmounts.length - 1] || 0)}
            </p>
            <div className="mt-2 text-xs text-emerald-500">
              総投資額
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 p-6 rounded-xl border border-purple-100">
            <p className="text-sm text-purple-600 font-medium mb-1">運用益</p>
            <p className="text-2xl font-bold text-purple-700">
              {formatCurrency(simulationResults.interestAmounts[simulationResults.interestAmounts.length - 1] || 0)}
            </p>
            <div className="mt-2 text-xs text-purple-500">
              利息・配当などの収益
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-xl border border-amber-100">
            <p className="text-sm text-amber-600 font-medium mb-1">投資利回り</p>
            <p className="text-2xl font-bold text-amber-700">
              {calculateROI().toFixed(2)}%
            </p>
            <div className="mt-2 text-xs text-amber-500">
              投資元本に対する収益率
            </div>
          </div>
        </div>
        
        {/* グラフ */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="h-96 md:h-[450px] w-full">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
      
      {/* 補足情報 */}
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-2xl p-8 shadow-xl">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          資産運用のポイント
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <h3 className="font-medium mb-2">複利の力を活用する</h3>
            <p className="text-sm opacity-90">長期間投資を続けることで、複利効果が大きく働き、資産が加速度的に成長します。</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <h3 className="font-medium mb-2">早く始めるほど有利</h3>
            <p className="text-sm opacity-90">若いうちから少額でも投資を始めることで、将来的に大きな資産形成が可能になります。</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <h3 className="font-medium mb-2">定期的な積立投資</h3>
            <p className="text-sm opacity-90">毎月一定額を投資することで、市場の上下に関わらず平均的なコストで投資できます。</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <h3 className="font-medium mb-2">分散投資の重要性</h3>
            <p className="text-sm opacity-90">複数の資産クラスに分散投資することで、リスクを抑えながらリターンを追求できます。</p>
          </div>
        </div>
      </div>
      
      <footer className="mt-10 text-center text-sm text-gray-500">
        <p>※このシミュレーションは参考値です。実際の運用結果は市場状況により変動します。</p>
      </footer>
    </div>
  );
} 