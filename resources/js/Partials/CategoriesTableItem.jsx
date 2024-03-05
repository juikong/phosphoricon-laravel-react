import React from "react";
import { phosphorIcon } from "@/Components/PhosphorIconUtils";

function CategoriesTableItem(props) {
    const statusColor = (status) => {
        switch (status) {
            case 1:
                return "bg-emerald-100 text-emerald-600";
            case 0:
                return "bg-amber-100 text-amber-600";
            default:
                return "bg-slate-100 text-slate-500";
        }
    };

    const statusText = (status) => {
        switch (status) {
            case 1:
                return "Active";
            case 0:
                return "Inactive";
            default:
                return "";
        }
    };

    return (
        <tr>
            <td className="px-2 py-3">
                <div className="flex items-center">
                    <label className="inline-flex">
                        <span className="sr-only">Select</span>
                        <input
                            id={props.id}
                            className="form-checkbox"
                            type="checkbox"
                            onChange={props.handleClick}
                            checked={props.isChecked}
                        />
                    </label>
                </div>
            </td>
            <td className="px-2 py-3">
                <div className="font-medium text-slate-800">{props.name}</div>
            </td>
            <td className="px-2 py-3">
                <div>{props.description}</div>
            </td>
            <td className="px-2 py-3">
                <div>{phosphorIcon(props.phosphoricon, 16)}</div>
            </td>
            <td className="px-2 py-3">
                <div className="font-medium text-sky-500">{props.sort}</div>
            </td>
            <td className="px-2 py-3">
                <div
                    className={`inline-flex font-medium rounded-full text-center px-2.5 py-0.5 ${statusColor(
                        props.status
                    )}`}
                >
                    {statusText(props.status)}
                </div>
            </td>
            <td className="px-2 py-3">
                <div className="space-x-1">
                    <button
                        className="text-slate-400 hover:text-slate-500 rounded-full"
                        onClick={(e) => {
                            e.stopPropagation();
                            props.handleEdit(props.id, props.phosphoricon.id);
                        }}
                        aria-controls="icon-modal"
                    >
                        <span className="sr-only">Edit</span>
                        <svg
                            className="w-8 h-8 fill-current"
                            viewBox="0 0 32 32"
                        >
                            <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default CategoriesTableItem;
