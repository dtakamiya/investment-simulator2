import InvestmentSimulator from '@/components/InvestmentSimulator';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 relative">
      {/* 装飾的な背景要素 */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 -z-10"></div>
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-indigo-300/10 blur-3xl -z-10"></div>
      <div className="absolute top-40 right-20 w-40 h-40 rounded-full bg-blue-300/10 blur-3xl -z-10"></div>
      
      <InvestmentSimulator />
    </div>
  );
}
