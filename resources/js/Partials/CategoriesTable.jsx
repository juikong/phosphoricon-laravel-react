import React, { useState, useEffect } from "react";
import Categories from "./CategoriesTableItem";

function CategoriesTable({
    modalOpen,
    selectedItems,
    selectedEdit,
    iconModalOpen,
}) {
    const [selectAll, setSelectAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        fetchList();
    }, [modalOpen]);

    const fetchList = async () => {
        await axios
            .get("/api/categories")
            .then((response) => {
                setList(response.data);
            })
            .catch((error) => {
                console.error("Error fetching categories: ", error);
            });
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        setIsCheck(list.map((li) => li.id));
        if (selectAll) {
            setIsCheck([]);
        }
    };

    const handleClick = (e) => {
        const id = parseInt(e.target.id);
        const { checked } = e.target;
        setSelectAll(false);
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id));
        }
    };

    const handleEdit = (id, iconId) => {
        if (!modalOpen) {
            selectedEdit(id);
            iconModalOpen(iconId);
        }
    };

    useEffect(() => {
        selectedItems(isCheck);
    }, [isCheck]);

    return (
        <div className="relative">
            <header className="px-2 py-3">
                <h2 className="font-semibold text-slate-800">Categories</h2>
            </header>
            <div>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead className="text-sm text-slate-500 border-b border-slate-200">
                            <tr>
                                <th className="px-2 py-3 w-px">
                                    <div className="flex items-center">
                                        <label className="inline-flex">
                                            <span className="sr-only">
                                                Select all
                                            </span>
                                            <input
                                                className="form-checkbox"
                                                type="checkbox"
                                                checked={selectAll}
                                                onChange={handleSelectAll}
                                            />
                                        </label>
                                    </div>
                                </th>
                                <th className="px-2 py-3">
                                    <div className="font-semibold text-left">
                                        Name
                                    </div>
                                </th>
                                <th className="px-2 py-3 w-1/4">
                                    <div className="font-semibold text-left">
                                        Description
                                    </div>
                                </th>
                                <th className="px-2 py-3 w-16">
                                    <div className="font-semibold text-left">
                                        Icon
                                    </div>
                                </th>
                                <th className="px-2 py-3">
                                    <div className="font-semibold text-left">
                                        Sort
                                    </div>
                                </th>
                                <th className="px-2 py-3">
                                    <div className="font-semibold text-left">
                                        Status
                                    </div>
                                </th>
                                <th className="px-2 py-3">
                                    <div className="font-semibold text-left">
                                        Actions
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        {/* Table body */}
                        <tbody className="text-sm divide-y divide-slate-200">
                            {list.map((category) => {
                                return (
                                    <Categories
                                        key={category.id}
                                        id={category.id}
                                        name={category.name}
                                        description={category.description}
                                        phosphoricon={category.phosphor_icon}
                                        sort={category.sort}
                                        status={category.status}
                                        handleClick={handleClick}
                                        handleEdit={handleEdit}
                                        isChecked={isCheck.includes(
                                            category.id
                                        )}
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CategoriesTable;
