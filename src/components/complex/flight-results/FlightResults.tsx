import { useMemo, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, Plane } from 'lucide-react';
import cs from './FlightResults.module.scss';
import { FlightChart } from '@/components/complex/flight-chart/FlightChart.tsx';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface FlightOffer {
  id: string;
  price: { total: string; currency: string };
  itineraries: any[];
  validatingAirlineCodes: string[];
}

const columnHelper = createColumnHelper<FlightOffer>();

export function FlightResults({ data }: { data: FlightOffer[] }) {
  const [selectedFlight, setSelectedFlight] = useState<FlightOffer | null>(
    null
  );
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const chartData = useMemo(() => {
    return (data || [])
      .map((flight) => ({
        airline: flight.validatingAirlineCodes?.[0] || 'N/A',
        price: parseFloat(flight.price?.total || '0'),
        currency: flight.price?.currency,
      }))
      .sort((a, b) => a.price - b.price);
  }, [data]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('validatingAirlineCodes', {
        header: 'Airline',
        cell: (info) => (
          <div className="flex items-center gap-2">
            <div className={cs.airlineBadge}>{info.getValue()[0]}</div>
            <span className="font-medium text-slate-700">
              Airline {info.getValue()[0]}
            </span>
          </div>
        ),
      }),
      columnHelper.accessor(
        (row) => row.itineraries[0].segments[0].departure.at,
        {
          id: 'departure',
          header: 'Schedule',
          cell: (info) => (
            <div className="flex flex-col">
              <span className="font-bold text-slate-900">
                {new Date(info.getValue()).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                })}
              </span>
              <span className="text-xs text-slate-500 uppercase tracking-wider">
                Departure
              </span>
            </div>
          ),
        }
      ),
      columnHelper.accessor(
        (row) => {
          const segments = row.itineraries[0].segments;
          return segments[segments.length - 1].arrival.at;
        },
        {
          id: 'arrival',
          header: 'Arrival',
          cell: (info) => (
            <div className="flex flex-col">
              <span className="font-bold text-slate-900">
                {new Date(info.getValue()).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                })}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-medium">
                Landing
              </span>
            </div>
          ),
        }
      ),
      columnHelper.accessor((row) => row.itineraries[0].duration, {
        id: 'duration',
        header: 'Duration',
        cell: (info) => (
          <span className="font-bold text-slate-900">
            {info.getValue().replace('PT', '').toLowerCase()}
          </span>
        ),
      }),
      columnHelper.accessor('price.total', {
        header: 'Fare',
        cell: (info) => (
          <div className="flex flex-col items-start">
            <span className={cs.priceText}>
              {info.row.original.price.currency}{' '}
              {parseFloat(info.getValue()).toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-bold">
              Incl. taxes & fees
            </span>
          </div>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        header: () => <div>Action</div>,
        cell: (info) => (
          <div className={cs.actionCell}>
            <button
              className={cs.bookButton}
              onClick={() => setSelectedFlight(info.row.original)}
            >
              Select
            </button>
          </div>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (!data || data.length === 0) return null;

  return (
    <section className={cs.resultsWrapper} aria-label="Flight search results">
      <FlightChart data={chartData} />
      <div className={cs.tableContainer}>
        <table className={cs.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className={cs.tableRow}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Block stays exactly as you liked it */}
        <div className={cs.pagination}>
          <div className={cs.pageStatus}>
            <span className={cs.statusLabel}>Showing</span>
            <span className={cs.statusValue}>
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
              {' - '}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize,
                data.length
              )}
            </span>
            <span className={cs.statusLabel}>of</span>
            <span className={cs.statusValue}>{data.length}</span>
            <span className={cs.statusLabel}>flights</span>
          </div>

          <div className={cs.navButtonGroup}>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className={cs.paginationBtn}
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
              <span>Previous</span>
            </button>
            <div className={cs.pageIndicator}>
              {table.getState().pagination.pageIndex + 1} /{' '}
              {table.getPageCount()}
            </div>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className={cs.paginationBtn}
            >
              <span>Next</span>
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Flight Info Dialog */}
      <Dialog
        open={!!selectedFlight}
        onOpenChange={() => setSelectedFlight(null)}
      >
        <DialogContent className={cs.dialogContent}>
          <DialogHeader>
            <DialogTitle className={cs.dialogTitle}>
              Flight Overview
            </DialogTitle>
          </DialogHeader>
          {selectedFlight && (
            <div className={cs.dialogBody}>
              <div className={cs.detailCard}>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cs.airlineBadge}>
                      {selectedFlight.validatingAirlineCodes[0]}
                    </div>
                    <span className="font-bold text-lg text-slate-900">
                      Airline {selectedFlight.validatingAirlineCodes[0]}
                    </span>
                  </div>
                  <span className={cs.priceHighlight}>
                    {selectedFlight.price.currency}{' '}
                    {parseFloat(selectedFlight.price.total).toLocaleString()}
                  </span>
                </div>
                <div className={cs.routeInfo}>
                  <div className="text-center">
                    <p className="text-2xl font-black text-slate-900">
                      {new Date(
                        selectedFlight.itineraries[0].segments[0].departure.at
                      ).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">
                      Departure
                    </p>
                  </div>
                  <div className={cs.routeLine}>
                    <Plane size={14} className={cs.planeIcon} />
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-black text-slate-900">
                      {new Date(
                        selectedFlight.itineraries[0].segments.at(-1).arrival.at
                      ).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">
                      Arrival
                    </p>
                  </div>
                </div>
              </div>
              <button className={cs.bookButton} style={{ marginTop: '1rem' }}>
                Confirm Selection
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

const SKELETON_BAR_HEIGHTS = [
  45, 72, 38, 65, 90, 52, 30, 85, 42, 60, 75, 55, 40, 68, 82,
];

export function FlightResultsSkeleton() {
  return (
    <div className="space-y-8 w-full animate-in fade-in duration-500">
      <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col gap-2 mb-6">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex items-end gap-3 h-[250px] px-2">
          {SKELETON_BAR_HEIGHTS.map((height, i) => (
            <Skeleton
              key={i}
              className="flex-1 rounded-t-sm"
              style={{
                height: `${height}%`,
                opacity: 1 - i * 0.05,
              }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-4 px-2">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-10" />
        </div>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="flex items-center gap-4 p-4 bg-slate-50 border-b border-slate-200">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-4 flex-1" />
          ))}
        </div>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-6 border-b border-slate-100 last:border-none"
          >
            <div className="flex items-center gap-4 flex-[2]">
              <Skeleton className="h-12 w-12 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="flex-1">
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <div className="flex-1 flex justify-end">
              <Skeleton className="h-10 w-28 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
