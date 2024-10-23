import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { CompanyInfo } from '../types';

interface CompanySelectorProps {
  companies: CompanyInfo[];
  selectedCompany: CompanyInfo | null;
  onCompanySelect: (company: CompanyInfo) => void;
  onAddCompany: (company: CompanyInfo) => void;
}

const CompanySelector: React.FC<CompanySelectorProps> = ({
  companies,
  selectedCompany,
  onCompanySelect,
  onAddCompany,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newCompany, setNewCompany] = useState<CompanyInfo>({
    id: '',
    name: '',
    address: '',
    phone: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCompany({
      ...newCompany,
      id: Date.now().toString(),
    });
    setIsAdding(false);
    setNewCompany({ id: '', name: '', address: '', phone: '', email: '' });
  };

  if (isAdding) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <input
            type="text"
            placeholder="会社名"
            value={newCompany.name}
            onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            placeholder="住所"
            value={newCompany.address}
            onChange={(e) => setNewCompany({ ...newCompany, address: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            placeholder="電話番号"
            value={newCompany.phone}
            onChange={(e) => setNewCompany({ ...newCompany, phone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="email"
            placeholder="メールアドレス"
            value={newCompany.email}
            onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            保存
          </button>
          <button
            type="button"
            onClick={() => setIsAdding(false)}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            キャンセル
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <select
          value={selectedCompany?.id || ''}
          onChange={(e) => {
            const company = companies.find((c) => c.id === e.target.value);
            if (company) onCompanySelect(company);
          }}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">請求元を選択...</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => setIsAdding(true)}
          className="px-3 py-2 text-indigo-600 hover:text-indigo-800"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
      {selectedCompany && (
        <div className="text-sm text-gray-600">
          <p>{selectedCompany.address}</p>
          <p>{selectedCompany.phone}</p>
          <p>{selectedCompany.email}</p>
        </div>
      )}
    </div>
  );
};

export default CompanySelector;