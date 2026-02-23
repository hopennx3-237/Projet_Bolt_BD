import { Edit2, Trash2 } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column[];
  data: T[];
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  keyField: string;
  loading?: boolean;
}

export const DataTable = <T extends any>({
  columns,
  data,
  onEdit,
  onDelete,
  keyField,
  loading = false
}: DataTableProps<T>) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-500">Chargement...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-500">Aucune donnée disponible</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-6 py-3 text-left text-sm font-semibold text-gray-900 ${column.width || ''}`}
              >
                {column.label}
              </th>
            ))}
            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900 w-24">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item[keyField]} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
              {columns.map((column) => (
                <td
                  key={`${item[keyField]}-${column.key}`}
                  className="px-6 py-4 text-sm text-gray-900"
                >
                  {String(item[column.key] || '')}
                </td>
              ))}
              <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Modifier"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(item)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
