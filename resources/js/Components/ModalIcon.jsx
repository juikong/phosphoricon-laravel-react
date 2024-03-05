import React, { useRef, useEffect, useState, Fragment } from "react";
import { phosphorIconCustom } from "@/Components/PhosphorIconUtils";
import { Dialog, Transition } from "@headlessui/react";

function ModalIcon({ modalOpen, initialIcon, selectIcon, iconModalClose }) {
    const [icons, setIcons] = useState([]);
    const [selectedIcon, setSelectedIcon] = useState();

    let selectButton = useRef(null);

    useEffect(() => {
        fetchIcons();
    }, []);

    const fetchIcons = async () => {
        await axios
            .get("/api/phosphor-icon")
            .then((response) => {
                setIcons(response.data);
            })
            .catch((error) => {
                console.error("Error fetching icons: ", error);
            });
    };

    return (
        <Transition show={modalOpen} as={Fragment}>
            <Dialog
                initialFocus={selectButton}
                className="relative z-50"
                onClose={() => iconModalClose()}
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-out duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div
                            className="fixed inset-0 bg-slate-900 bg-opacity-30"
                            aria-hidden="true"
                        />
                    </Transition.Child>
                    <div className="fixed inset-0 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-200"
                                enterFrom="opacity-0 translate-y-4"
                                enterTo="opacity-100 scale-100"
                                leave="transition ease-in-out duration-200"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-4"
                            >
                                <Dialog.Panel className="mx-auto w-full max-w-2xl rounded bg-white">
                                    <div className="py-4 px-2">
                                        <div className="mb-3">
                                            <div className="font-semibold text-slate-500 px-2 mb-2">
                                                Select Icon
                                            </div>
                                            <div className="grid grid-cols-12 gap-3 p-3 place-items-center">
                                                {icons.map((icon, index) => {
                                                    const IconCustom =
                                                        phosphorIconCustom(
                                                            icon
                                                        );
                                                    return (
                                                        <IconCustom
                                                            key={index}
                                                            className={`w-8 h-8 border-2 ${
                                                                initialIcon ===
                                                                icon.id
                                                                    ? selectedIcon ===
                                                                      undefined
                                                                        ? "border-indigo-600"
                                                                        : selectedIcon ===
                                                                          icon.id
                                                                        ? "border-indigo-600"
                                                                        : "border-white"
                                                                    : selectedIcon ===
                                                                      icon.id
                                                                    ? "border-indigo-600"
                                                                    : "border-white"
                                                            }`}
                                                            size={32}
                                                            onClick={() =>
                                                                setSelectedIcon(
                                                                    icon.id
                                                                )
                                                            }
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <button
                                            className="inline-flex font-medium rounded bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2"
                                            ref={selectButton}
                                            onClick={() =>
                                                selectIcon(selectedIcon)
                                            }
                                        >
                                            Select
                                        </button>
                                        <button
                                            className="inline-flex font-medium rounded border-slate-200 hover:border-slate-300 text-slate-600 ml-3 px-3 py-2"
                                            onClick={() => iconModalClose()}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default ModalIcon;
