import { TableHedaer } from "../../components/ui/TableHeader";
import { RowSkeleton } from "../../components/ui/table/TableSkeleton";
import { useEffect, useState } from "react";
import type { IBrand } from "./brand.contract";
import { toast } from "sonner";
import axiosInstance from "../../config/axios.config";
import type { IPagination, IResponse } from "../../common/GlobalType";
import { TablePagination } from "../../components/ui/table/TablePagination";
import { RowActions } from "../../components/ui/table/RowAction";

export default function BrandListPage() {
    const [loading, setLoading] = useState<boolean>(true);
    const [brands, setBrands] = useState<Array<IBrand>>([]);
    const [search, setSearch] = useState<string>("");

    const [pagination, setPagination] = useState<IPagination>({
        limit: 20,
        page: 1,
        total: 0,
        totalNoOfpages: 1,
    });

    // ✅ MAIN FUNCTION (compatible with your components)
    const getBrandList = async ({
        limit = pagination.limit,
        page = pagination.page,
        search = "",
    }: {
        limit?: number;
        page?: number;
        search?: string;
    } = {}): Promise<void> => {
        setLoading(true);

        try {
            const response: IResponse<IBrand> = await axiosInstance.get("/brand", {
                params: {
                    limit,
                    page,
                    search: search,
                },
            });

            setBrands(response.data);
            setPagination(response.meta.pagination);
            setSearch(search);
        } catch {
            toast.error("Sorry! Could not fetch data!!!");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Initial load
    useEffect(() => {
        getBrandList({ limit: 20, page: 1, search: "" });
    }, []);

    const onDeleteConfirm = async (id: string) => {
        try {
            setLoading(true);
            await axiosInstance.delete("/brand/" + id);
            toast.success("Brand deleted successfully");

            // ✅ keep current page & search after delete
            await getBrandList({
                limit: pagination.limit,
                page: pagination.page,
                search,
            });
        } catch {
            toast.error("Error deleting Brand", {
                description:
                    "There was some issue while deleting brand please try again once",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full p-5 bg-white rounded-lg shadow-md">
            {/* Header */}
            <TableHedaer
                title="Brand"
                showSearch={true}
                btnTxt="+ Add Brand"
                btnUrl={"/admin/brand/create"}
                // ✅ Search handler
                getSearchResult={({ search }) =>
                    getBrandList({ page: 1, search })
                }
            />

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-left border border-gray-200 rounded-tl-lg rounded-tr-lg overflow-hidden table-fixed">
                    <thead className="bg-stone-900/75">
                        <tr>
                            <th className="w-1/4 px-4 py-3 font-medium text-gray-100 text-center">Name</th>
                            <th className="w-1/4 px-4 py-3 font-medium text-gray-100 text-center">Thumbnail</th>
                            <th className="w-1/4 px-4 py-3 font-medium text-gray-100 text-center">Status</th>
                            <th className="w-1/4 px-4 py-3 font-medium text-gray-100 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <RowSkeleton rows={5} columns={4} />
                        ) : brands && brands.length ? (
                            brands.map((i: IBrand) => (
                                <tr
                                    key={i._id}
                                    className="border-b boarder-b-gray-200 hover:bg-stone-100"
                                >
                                    <td className="px-4 py-3 text-center">{i.name}</td>

                                    <td className="px-4 py-3">
                                        <img
                                            src={i?.logo?.url}
                                            alt={i.name}
                                            className="w-20 rounded-md object-cover mx-auto"
                                        />
                                    </td>

                                    <td className="text-center px-4 py-3">
                                        <span
                                            className={`inline-block px-10 py-1 rounded-full text-xs font-semibold ${
                                                i.status === "active"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {i.status === "active"
                                                ? "Published"
                                                : "Un-Published"}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="flex justify-center gap-3">
                                            <RowActions
                                                editUrl={"/admin/brand/" + i._id}
                                                rowId={i._id}
                                                onDeleteConfirm={onDeleteConfirm}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-4 py-3 text-center">
                                    No Data found...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {!loading && (
                <TablePagination
                    pagination={pagination}
                    getDataAction={({ limit, page }) =>
                        getBrandList({ limit, page, search })
                    }
                />
            )}
        </section>
    );
}
