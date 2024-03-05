import { forwardRef } from "react";
import { IconBase } from "@phosphor-icons/react";

export const phosphorIcon = (item, size) => {
    let icon_defs = [];
    item.icon_defs.map((def) => {
        if (def.type === "regular") {
            icon_defs = [
                [
                    def.type,
                    <>
                        <path d={def.value} />
                    </>,
                ],
            ];
        }
    });
    const weights = new Map(icon_defs);
    const CustomIcon = forwardRef((props, ref) => (
        <IconBase ref={ref} {...props} weights={weights} />
    ));
    CustomIcon.displayName = item.icon_name;
    return <CustomIcon size={size} />;
};

export const phosphorIconCustom = (item) => {
    let icon_defs = [];
    item.icon_defs.map((def) => {
        if (def.type !== "duotone") {
            let icon_def = [];
            icon_def = [
                def.type,
                <>
                    <path d={def.value} />
                </>,
            ];
            icon_defs.push(icon_def);
        } else {
            let icon_def = [];
            icon_def = [
                def.type,
                <>
                    <path d={def.value} opacity={def.opacity} />
                    <path d={def.extra} />
                </>,
            ];
            icon_defs.push(icon_def);
        }
    });
    const weights = new Map(icon_defs);
    const CustomIcon = forwardRef((props, ref) => (
        <IconBase ref={ref} {...props} weights={weights} />
    ));
    CustomIcon.displayName = item.icon_name;
    return CustomIcon;
};
