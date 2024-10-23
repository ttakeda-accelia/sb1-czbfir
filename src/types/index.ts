export interface CompanyInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

export interface InvoiceData {
  companyInfo: CompanyInfo;
  clientInfo: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  items: InvoiceItem[];
  notes: string[];
}