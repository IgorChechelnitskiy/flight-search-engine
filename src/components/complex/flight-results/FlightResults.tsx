import { useMemo, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, FilterX, Plane } from 'lucide-react';
import cs from './FlightResults.module.scss';
import { FlightChart } from '@/components/complex/flight-chart/FlightChart.tsx';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

export function FlightResults({ data }: { data: FlightOffer[] | null }) {
  const [selectedFlight, setSelectedFlight] = useState<FlightOffer | null>(
    null
  );
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sortOrder, setSortOrder] = useState<
    'asc' | 'desc' | 'airline' | 'none'
  >('none');
  const [priceRange, setPriceRange] = useState({ from: '', to: '' });
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);

  const { isEmpty, isInitialState } = useMemo(() => {
    if (data === null || data === undefined) {
      return { isEmpty: false, isInitialState: true };
    }
    const hasNoData = Array.isArray(data)
      ? data.length === 0
      : typeof data === 'object' && Object.keys(data).length === 0;

    return { isEmpty: hasNoData, isInitialState: false };
  }, [data]);

  const uniqueAirlines = useMemo(() => {
    const codes = (data || []).map((f) => f.validatingAirlineCodes[0]);
    return Array.from(new Set(codes)).sort();
  }, [data]);

  const processedData = useMemo(() => {
    let result = Array.isArray(data) ? [...data] : [];

    if (priceRange.from) {
      result = result.filter(
        (f) => parseFloat(f.price.total) >= parseFloat(priceRange.from)
      );
    }
    if (priceRange.to) {
      result = result.filter(
        (f) => parseFloat(f.price.total) <= parseFloat(priceRange.to)
      );
    }
    if (selectedAirlines.length > 0) {
      result = result.filter((f) =>
        selectedAirlines.includes(f.validatingAirlineCodes[0])
      );
    }

    if (sortOrder !== 'none') {
      result.sort((a, b) => {
        if (sortOrder === 'airline') {
          return a.validatingAirlineCodes[0].localeCompare(
            b.validatingAirlineCodes[0]
          );
        }
        const pA = parseFloat(a.price.total);
        const pB = parseFloat(b.price.total);
        return sortOrder === 'asc' ? pA - pB : pB - pA;
      });
    }

    return result;
  }, [data, priceRange, selectedAirlines, sortOrder]);

  const chartData = useMemo(() => {
    return processedData.map((flight) => ({
      airline: flight.validatingAirlineCodes?.[0] || 'N/A',
      price: parseFloat(flight.price?.total || '0'),
      currency: flight.price?.currency,
    }));
  }, [processedData]);

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
              <span className="text-xs text-slate-700 uppercase tracking-wider">
                Departure
              </span>
            </div>
          ),
        }
      ),
      columnHelper.accessor(
        (row) => row.itineraries[0].segments.at(-1).arrival.at,
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
              <span className="text-[10px] text-slate-700 uppercase font-medium">
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
          </div>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Action',
        cell: (info) => (
          <button
            className={cs.bookButton}
            onClick={() => setSelectedFlight(info.row.original)}
          >
            Select
          </button>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: processedData,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // 8. EARLY RENDERS
  if (isInitialState) return null;

  if (isEmpty) {
    return (
      <div className={cs.noResultsContainer}>
        <div className={cs.iconWrapper}>
          <Plane className={cs.sadPlane} size={48} />
        </div>
        <h3 className={cs.noResultsTitle}>No Flights Found</h3>
        <p className={cs.noResultsText}>
          We couldn't find any flights for this route. Try changing your search
          criteria.
        </p>
      </div>
    );
  }

  return (
    <section className={cs.resultsWrapper} aria-label="Flight search results">
      {/* Filtering and Sorting Header */}
      <div className={cs.resultsHeader}>
        <div className={cs.filterBar}>
          <div className={cs.filterGroup}>
            <label>Price Range</label>
            <div className={cs.inputPair}>
              <input
                type="number"
                placeholder="From"
                value={priceRange.from}
                onChange={(e) =>
                  setPriceRange((p) => ({ ...p, from: e.target.value }))
                }
              />
              <input
                type="number"
                placeholder="To"
                value={priceRange.to}
                onChange={(e) =>
                  setPriceRange((p) => ({ ...p, to: e.target.value }))
                }
              />
            </div>
          </div>

          <div className={cs.filterGroup}>
            <label>Airlines</label>
            <div className={cs.airlineChips}>
              {uniqueAirlines.map((code) => (
                <button
                  key={code}
                  className={`${cs.chip} ${selectedAirlines.includes(code) ? cs.activeChip : ''}`}
                  onClick={() =>
                    setSelectedAirlines((prev) =>
                      prev.includes(code)
                        ? prev.filter((c) => c !== code)
                        : [...prev, code]
                    )
                  }
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          {(priceRange.from ||
            priceRange.to ||
            selectedAirlines.length > 0) && (
            <button
              className={cs.clearAll}
              onClick={() => {
                setPriceRange({ from: '', to: '' });
                setSelectedAirlines([]);
              }}
            >
              Clear
            </button>
          )}
        </div>

        <div className={cs.controlsRow}>
          <div className={cs.infoBlock}>
            <h2 className={cs.resultsTitle}>Available Offers</h2>
            <p className={cs.resultsSubtitle}>
              Showing {processedData.length} flights
            </p>
          </div>

          <div className={cs.buttonGroup}>
            <button
              className={`${cs.sortBtn} ${sortOrder === 'asc' ? cs.active : ''}`}
              onClick={() => setSortOrder('asc')}
            >
              Cheapest
            </button>
            <button
              className={`${cs.sortBtn} ${sortOrder === 'desc' ? cs.active : ''}`}
              onClick={() => setSortOrder('desc')}
            >
              Priciest
            </button>
            <button
              className={`${cs.sortBtn} ${sortOrder === 'airline' ? cs.active : ''}`}
              onClick={() => setSortOrder('airline')}
            >
              Airline
            </button>
            <button
              className={cs.resetBtn}
              onClick={() => setSortOrder('none')}
            >
              Reset Sort
            </button>
          </div>
        </div>
      </div>

      {processedData.length > 0 ? (
        <>
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={cs.pagination}>
              <div className={cs.pageStatus}>
                <span>
                  {table.getState().pagination.pageIndex * pagination.pageSize +
                    1}{' '}
                  -{' '}
                  {Math.min(
                    (table.getState().pagination.pageIndex + 1) *
                      pagination.pageSize,
                    processedData.length
                  )}{' '}
                  of {processedData.length}
                </span>
              </div>
              <div className={cs.navButtonGroup}>
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className={cs.paginationBtn}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className={cs.paginationBtn}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={cs.filterEmpty}>
          <FilterX size={40} />
          <p>No flights match your active filters.</p>
        </div>
      )}

      <Dialog
        open={!!selectedFlight}
        onOpenChange={() => setSelectedFlight(null)}
      >
        <DialogContent className={cs.dialogContent}>
          <DialogHeader>
            <DialogTitle className={cs.dialogTitle}>Flight Details</DialogTitle>
            <DialogDescription className={cs.visuallyHidden}>
              Review the itinerary and fare details for your selected flight.
            </DialogDescription>
          </DialogHeader>

          {selectedFlight && (
            <div className={cs.dialogBody}>
              <div className={cs.detailCard}>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-lg text-slate-900">
                    Airline {selectedFlight.validatingAirlineCodes[0]}
                  </span>
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
                    <span className="text-[10px] text-slate-500 uppercase font-bold">
                      Departure
                    </span>
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
                    <span className="text-[10px] text-slate-500 uppercase font-bold">
                      Arrival
                    </span>
                  </div>
                </div>
              </div>

              <button
                className={cs.bookButton}
                style={{ width: '100%', marginTop: '1.5rem' }}
                onClick={() => {
                  console.log('Booking flight:', selectedFlight.id);
                  setSelectedFlight(null);
                }}
              >
                Confirm & Book Flight
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
