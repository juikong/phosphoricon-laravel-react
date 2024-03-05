import React, { useState } from "react";

import ModalIcon from "../Components/ModalIcon";
import CategoriesTable from "../Partials/CategoriesTable";

function Categories() {
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedEdit, setSelectedEdit] = useState(0);
    const [initialIcon, setInitialIcon] = useState();
    const [iconModalOpen, setIconModalOpen] = useState(false);

    const handleSelectedItems = (selectedItems) => {
        setSelectedItems([...selectedItems]);
    };

    const handleSelectedEdit = (selectedEdit) => {
        setSelectedEdit(selectedEdit);
    };

    const handleIconModalOpen = (initialIcon) => {
        setInitialIcon(initialIcon);
        setIconModalOpen(true);
    };

    const handleSelectIcon = (iconId) => {
        updateCategory(selectedEdit, iconId);
        setIconModalOpen(false);
    };

    const handleIconModalClose = () => {
        setIconModalOpen(false);
    };

    const updateCategory = async (categoryId, iconId) => {
        await axios
            .post("/api/category-edit", {
                id: categoryId,
                phosphor_icon_id: iconId,
            })
            .catch((error) => {
                console.error("Error update category: ", error);
            });
    };

    return (
        <div>
            <main>
                <div className="py-10">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <CategoriesTable
                            modalOpen={iconModalOpen}
                            selectedItems={handleSelectedItems}
                            selectedEdit={handleSelectedEdit}
                            iconModalOpen={handleIconModalOpen}
                        />
                        <ModalIcon
                            modalOpen={iconModalOpen}
                            initialIcon={initialIcon}
                            selectIcon={handleSelectIcon}
                            iconModalClose={handleIconModalClose}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Categories;
