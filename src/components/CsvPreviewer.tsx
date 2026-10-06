import React, { useState } from 'react';
import Papa from 'papaparse';
import { FileSpreadsheet, Upload, Download, CheckCircle, AlertCircle, RefreshCw, Send } from 'lucide-react';
import { toast } from 'sonner';

export const CsvPreviewer: React.FC = () => {
  const [csvData, setCsvData] = useState<any[] | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const sampleCsvText = `Item Name,Category,Quantity (Kg),Target Price (Per Kg),Comments
Premium Family Mix Tea,Tea,100,350,Assam blend preferred
Red Chilli Powder,Spices,50,300,Stemless bright red grade
Special Urad Papad,Papad,75,200,Small batch fresh stock
Strong Dust Tea,Tea,200,270,For hotel chain supply`;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setCsvData(results.data);
        toast.success(`Successfully parsed ${results.data.length} items from ${file.name}`);
      },
      error: (err) => {
        toast.error(`Error reading CSV file: ${err.message}`);
      }
    });
  };

  const handleLoadSample = () => {
    setFileName('Sample_Wholesale_Order.csv');
    Papa.parse(sampleCsvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setCsvData(results.data);
        toast.success('Sample B2B CSV order loaded!');
      }
    });
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-brand-charcoal/90 border border-brand-gold/30 text-brand-cream space-y-6 shadow-2xl">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-brand-gold/20 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-gold">
            <FileSpreadsheet className="w-4 h-4" /> B2B Bulk Import Tool (PapaParse)
          </div>
          <h3 className="font-serif text-xl font-bold text-brand-cream mt-1">
            Upload CSV Purchase List
          </h3>
          <p className="text-xs text-brand-cream/60">
            Preview & validate your bulk item order spreadsheet directly in browser.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleLoadSample}
            className="px-3.5 py-2 rounded-xl bg-brand-cream/10 border border-brand-gold/30 text-brand-gold font-bold text-xs hover:bg-brand-gold/20 transition-all flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Load Sample CSV</span>
          </button>
        </div>
      </div>

      {/* File Upload Zone */}
      {!csvData ? (
        <div className="border-2 border-dashed border-brand-gold/40 rounded-2xl p-10 text-center space-y-4 hover:border-brand-gold transition-colors bg-brand-green-deep/40">
          <Upload className="w-12 h-12 text-brand-gold mx-auto opacity-80" />
          <div>
            <h4 className="font-bold text-sm text-brand-cream">Drag & Drop your CSV file here</h4>
            <p className="text-xs text-brand-cream/60 mt-1">Supports .csv files with headers: Item Name, Quantity, Target Price</p>
          </div>

          <label className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-charcoal font-bold text-xs uppercase tracking-wider cursor-pointer hover:scale-105 transition-all shadow-lg">
            <span>Browse CSV File</span>
            <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-brand-gold font-semibold bg-brand-gold/10 p-3 rounded-xl border border-brand-gold/30">
            <span>File: {fileName} ({csvData.length} records parsed)</span>
            <button
              onClick={() => {
                setCsvData(null);
                setFileName('');
              }}
              className="text-brand-cream/70 hover:text-brand-red underline"
            >
              Upload Different File
            </button>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto rounded-2xl border border-brand-gold/20">
            <table className="w-full text-left text-xs text-brand-cream">
              <thead className="bg-brand-green-deep text-brand-gold font-bold uppercase tracking-wider border-b border-brand-gold/30">
                <tr>
                  {Object.keys(csvData[0] || {}).map((header) => (
                    <th key={header} className="px-4 py-3">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-gold/10 bg-brand-charcoal/50">
                {csvData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-brand-gold/5 transition-colors">
                    {Object.values(row).map((val: any, i) => (
                      <td key={i} className="px-4 py-3 font-medium">{String(val)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-brand-green-deep border border-brand-gold/30 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-brand-gold font-semibold">
              <CheckCircle className="w-4 h-4" /> Ready for Factory Quote Dispatch
            </span>
            <button
              onClick={() => toast.success('CSV order submitted to factory team! We will reply with official proforma invoice.')}
              className="px-5 py-2.5 rounded-xl bg-brand-gold text-brand-charcoal font-bold hover:scale-105 transition-all flex items-center gap-1.5 shadow"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit CSV for Factory Invoice</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default CsvPreviewer;
