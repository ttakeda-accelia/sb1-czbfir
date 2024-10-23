import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import type { InvoiceData } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    companyInfo: {
      id: '',
      name: '',
      address: '',
      phone: '',
      email: '',
    },
    clientInfo: {
      name: '',
      address: '',
      phone: '',
      email: '',
    },
    items: [{ id: '1', description: '', quantity: 1, price: 0 }],
    notes: [
      'お支払い期限: 請求書発行日より30日以内',
      '振込手数料は貴社負担でお願いいたします。',
      'ご不明な点がございましたら、お気軽にお問い合わせください。',
    ],
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">請求書作成</span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('edit')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'edit'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                編集
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'preview'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                プレビュー
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'edit' ? (
          <InvoiceForm data={invoiceData} onChange={setInvoiceData} />
        ) : (
          <InvoicePreview data={invoiceData} />
        )}
      </main>
    </div>
  );
}

export default App;