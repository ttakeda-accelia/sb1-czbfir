import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import type { CompanyInfo, InvoiceItem, InvoiceData } from '../types';
import CompanySelector from './CompanySelector';
import NotesEditor from './NotesEditor';

const STORAGE_KEY = 'invoice-companies';

interface InvoiceFormProps {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ data, onChange }) => {
  const [companies, setCompanies] = useState<CompanyInfo[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
  }, [companies]);

  const addCompany = (company: CompanyInfo) => {
    setCompanies([...companies, company]);
    onChange({
      ...data,
      companyInfo: company,
    });
  };

  const addItem = () => {
    onChange({
      ...data,
      items: [
        ...data.items,
        {
          id: String(Date.now()),
          description: '',
          quantity: 1,
          price: 0,
        },
      ],
    });
  };

  const removeItem = (id: string) => {
    onChange({
      ...data,
      items: data.items.filter((item) => item.id !== id),
    });
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    onChange({
      ...data,
      items: data.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const calculateTotal = () => {
    return data.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">請求元情報</h3>
          <CompanySelector
            companies={companies}
            selectedCompany={data.companyInfo.id ? data.companyInfo : null}
            onCompanySelect={(company) => onChange({ ...data, companyInfo: company })}
            onAddCompany={addCompany}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">請求先情報</h3>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="会社名/お客様名"
              value={data.clientInfo.name}
              onChange={(e) =>
                onChange({
                  ...data,
                  clientInfo: { ...data.clientInfo, name: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="住所"
              value={data.clientInfo.address}
              onChange={(e) =>
                onChange({
                  ...data,
                  clientInfo: { ...data.clientInfo, address: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="電話番号"
              value={data.clientInfo.phone}
              onChange={(e) =>
                onChange({
                  ...data,
                  clientInfo: { ...data.clientInfo, phone: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="email"
              placeholder="メールアドレス"
              value={data.clientInfo.email}
              onChange={(e) =>
                onChange({
                  ...data,
                  clientInfo: { ...data.clientInfo, email: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">請求項目</h3>
        <div className="space-y-4">
          {data.items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="項目の説明"
                value={item.description}
                onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                placeholder="数量"
                value={item.quantity}
                onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                className="w-24 px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                placeholder="単価"
                value={item.price}
                onChange={(e) => updateItem(item.id, 'price', parseInt(e.target.value) || 0)}
                className="w-32 px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={() => removeItem(item.id)}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addItem}
          className="flex items-center px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
        >
          <PlusCircle className="h-5 w-5 mr-1" />
          項目を追加
        </button>
      </div>

      <NotesEditor
        notes={data.notes}
        onChange={(notes) => onChange({ ...data, notes })}
      />

      <div className="flex justify-end">
        <div className="text-right">
          <span className="text-lg font-medium">合計金額: </span>
          <span className="text-2xl font-bold">¥{calculateTotal().toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;