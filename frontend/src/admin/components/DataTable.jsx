import {
    Edit,
    Trash2,
    Eye,
} from "lucide-react";

export default function DataTable({
    columns = [],
    data = [],
    loading = false,
    onEdit,
    onDelete,
    onView,
    emptyMessage = "No data found.",
}) {
    return (
        <div
            className="
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                shadow-xl
            "
        >

            {/* Desktop */}
            <div className="hidden md:block overflow-x-auto">

                <table className="w-full text-sm">

                    <thead>
                        <tr
                            className="
                                bg-white/5
                                border-b
                                border-white/10
                            "
                        >

                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className="
                                        px-5 py-4
                                        text-left
                                        font-semibold
                                        text-slate-300
                                        whitespace-nowrap
                                    "
                                >
                                    {column.label}
                                </th>
                            ))}

                            {(onEdit ||
                                onDelete ||
                                onView) && (
                                <th
                                    className="
                                        px-5 py-4
                                        text-right
                                        font-semibold
                                        text-slate-300
                                    "
                                >
                                    Actions
                                </th>
                            )}

                        </tr>
                    </thead>

                    <tbody>

                        {loading ? (
                            <tr>
                                <td
                                    colSpan={
                                        columns.length +
                                        1
                                    }
                                    className="
                                        px-5 py-12
                                        text-center
                                        text-slate-400
                                    "
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={
                                        columns.length +
                                        1
                                    }
                                    className="
                                        px-5 py-12
                                        text-center
                                        text-slate-500
                                    "
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((item, index) => (
                                <tr
                                    key={
                                        item.id ??
                                        index
                                    }
                                    className="
                                        border-b
                                        border-white/5
                                        last:border-b-0
                                        hover:bg-white/5
                                        transition
                                    "
                                >

                                    {columns.map(
                                        (column) => (
                                            <td
                                                key={
                                                    column.key
                                                }
                                                className="
                                                    px-5 py-4
                                                    text-slate-300
                                                "
                                            >
                                                {column.render
                                                    ? column.render(
                                                          item
                                                      )
                                                    : item[
                                                          column.key
                                                      ] ?? "—"}
                                            </td>
                                        )
                                    )}

                                    {(onEdit ||
                                        onDelete ||
                                        onView) && (
                                        <td className="px-5 py-4">

                                            <div className="flex justify-end gap-2">

                                                {onView && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            onView(
                                                                item
                                                            )
                                                        }
                                                        className="
                                                            p-2
                                                            rounded-lg
                                                            bg-blue-500/10
                                                            text-blue-400
                                                            hover:bg-blue-500/20
                                                        "
                                                        title="View"
                                                    >
                                                        <Eye
                                                            size={
                                                                17
                                                            }
                                                        />
                                                    </button>
                                                )}

                                                {onEdit && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            onEdit(
                                                                item
                                                            )
                                                        }
                                                        className="
                                                            p-2
                                                            rounded-lg
                                                            bg-purple-500/10
                                                            text-purple-400
                                                            hover:bg-purple-500/20
                                                        "
                                                        title="Edit"
                                                    >
                                                        <Edit
                                                            size={
                                                                17
                                                            }
                                                        />
                                                    </button>
                                                )}

                                                {onDelete && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            onDelete(
                                                                item
                                                            )
                                                        }
                                                        className="
                                                            p-2
                                                            rounded-lg
                                                            bg-red-500/10
                                                            text-red-400
                                                            hover:bg-red-500/20
                                                        "
                                                        title="Delete"
                                                    >
                                                        <Trash2
                                                            size={
                                                                17
                                                            }
                                                        />
                                                    </button>
                                                )}

                                            </div>

                                        </td>
                                    )}

                                </tr>
                            ))
                        )}

                    </tbody>

                </table>

            </div>

            {/* Mobile */}
            <div className="md:hidden">

                {loading ? (
                    <div className="p-8 text-center text-slate-400">
                        Loading...
                    </div>
                ) : data.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">
                        {emptyMessage}
                    </div>
                ) : (
                    <div className="divide-y divide-white/10">

                        {data.map(
                            (item, index) => (
                                <div
                                    key={
                                        item.id ??
                                        index
                                    }
                                    className="p-4"
                                >

                                    <div className="space-y-3">

                                        {columns.map(
                                            (
                                                column
                                            ) => (
                                                <div
                                                    key={
                                                        column.key
                                                    }
                                                    className="flex justify-between gap-4"
                                                >

                                                    <span className="text-xs text-slate-500">
                                                        {
                                                            column.label
                                                        }
                                                    </span>

                                                    <span className="text-sm text-slate-300 text-right">
                                                        {column.render
                                                            ? column.render(
                                                                  item
                                                              )
                                                            : item[
                                                                  column.key
                                                              ] ??
                                                              "—"}
                                                    </span>

                                                </div>
                                            )
                                        )}

                                    </div>

                                    {(onEdit ||
                                        onDelete ||
                                        onView) && (
                                        <div className="flex justify-end gap-2 mt-4">

                                            {onView && (
                                                <button
                                                    onClick={() =>
                                                        onView(
                                                            item
                                                        )
                                                    }
                                                    className="
                                                        flex items-center
                                                        gap-2
                                                        px-3 py-2
                                                        rounded-lg
                                                        bg-blue-500/10
                                                        text-blue-400
                                                        text-xs
                                                    "
                                                >
                                                    <Eye
                                                        size={
                                                            15
                                                        }
                                                    />
                                                    View
                                                </button>
                                            )}

                                            {onEdit && (
                                                <button
                                                    onClick={() =>
                                                        onEdit(
                                                            item
                                                        )
                                                    }
                                                    className="
                                                        flex items-center
                                                        gap-2
                                                        px-3 py-2
                                                        rounded-lg
                                                        bg-purple-500/10
                                                        text-purple-400
                                                        text-xs
                                                    "
                                                >
                                                    <Edit
                                                        size={
                                                            15
                                                        }
                                                    />
                                                    Edit
                                                </button>
                                            )}

                                            {onDelete && (
                                                <button
                                                    onClick={() =>
                                                        onDelete(
                                                            item
                                                        )
                                                    }
                                                    className="
                                                        flex items-center
                                                        gap-2
                                                        px-3 py-2
                                                        rounded-lg
                                                        bg-red-500/10
                                                        text-red-400
                                                        text-xs
                                                    "
                                                >
                                                    <Trash2
                                                        size={
                                                            15
                                                        }
                                                    />
                                                    Delete
                                                </button>
                                            )}

                                        </div>
                                    )}

                                </div>
                            )
                        )}

                    </div>
                )}

            </div>

        </div>
    );
}