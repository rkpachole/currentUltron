export const colourStyles = {
    option: (styles, { isFocused, isSelected, isVisited }) => {
        return {
            ...styles,
            cursor: "pointer",
            backgroundColor: isFocused
                ? "#f8f9fa"
                : isSelected
                    ? "#eee"
                    : isVisited
                        ? "#eee"
                        : undefined,
            color: isSelected ? "#000" : "#111",
        };
    },
    control: (styles) => ({
        ...styles,
        cursor: "pointer"
    }),
};