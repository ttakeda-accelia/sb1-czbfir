import React from 'react';
import { Download } from 'lucide-react';
import type { InvoiceData } from '../types';

interface InvoicePreviewProps {
  data: InvoiceData;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ data }) => {
  const calculateSubtotal = () => {
    return data.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const calculateTax = () => {
    return Math.floor(calculateSubtotal() * 0.1);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">請求書</h1>
          <p className="text-gray-600">請求書番号: INV-{new Date().getTime()}</p>
          <p className="text-gray-600">発行日: {new Date().toLocaleDateString('ja-JP')}</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          <Download className="h-5 w-5 mr-2" />
          PDFをダウンロード
        </button>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">請求元</h3>
          <div className="text-gray-600">
            <p>{data.companyInfo.name}</p>
            <p>{data.companyInfo.address}</p>
            <p>TEL: {data.companyInfo.phone}</p>
            <p>Email: {data.companyInfo.email}</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">請求先</h3>
          <div className="text-gray-600">
            <p>{data.clientInfo.name}</p>
            <p>{data.clientInfo.address}</p>
            <p>TEL: {data.clientInfo.phone}</p>
            <p>Email: {data.clientInfo.email}</p>
          </div>
        </div>
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="text-left py-3">項目</th>
            <th className="text-right py-3">数量</th>
            <th className="text-right py-3">単価</th>
            <th className="text-right py-3">金額</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => (
            <tr key={item.id} className="border-b border-gray-200">
              <td className="py-3">{item.description}</td>
              <td className="text-right py-3">{item.quantity}</td>
              <td className="text-right py-3">¥{item.price.toLocaleString()}</td>
              <td className="text-right py-3">
                ¥{(item.quantity * item.price).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="text-right py-4 font-medium">小計:</td>
            <td className="text-right py-4 font-medium">
              ¥{calculateSubtotal().toLocaleString()}
            </td>
          </tr>
          <tr>
            <td colSpan={3} className="text-right py-2">消費税 (10%):</td>
            <td className="text-right py-2">¥{calculateTax().toLocaleString()}</td>
          </tr>
          <tr className="border-t-2 border-gray-200">
            <td colSpan={3} className="text-right py-4 font-bold">合計:</td>
            <td className="text-right py-4 font-bold text-xl">
              ¥{calculateTotal().toLocaleString()}
            </td>
          </tr>
        </tfoot>
      </table>

      <div className="border-t border-gray-200 pt-8">
        <h4 className="text-lg font-medium text-gray-900 mb-2">備考</h4>
        <div className="text-gray-600 space-y-1">
          {data.notes.map((note, index) => (
            <p key={index}>・{note}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;