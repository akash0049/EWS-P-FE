import {
    forwardRef,
    useId,
    useState,
    useRef,
    useEffect,
    useCallback,
} from "react";
import {
    Box,
    Typography,
    InputBase,
    Paper,
    Popper,
    ClickAwayListener,
    IconButton,
    CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
export interface SelectOption {
    /** The value stored / emitted */
    value: string | number;
    /** Display text shown in the list and input */
    label: string;
    /** Optional extra metadata – not rendered, but available to consumers */
    [key: string]: unknown;
}

export interface CustomSelectInputProps {
    /** Options to display in the dropdown */
    options: SelectOption[];
    /** Controlled value */
    value?: SelectOption["value"] | null;
    /** Called with the new value (or null when cleared) */
    onChange?: (value: SelectOption["value"] | null, option: SelectOption | null) => void;
    /** Static label rendered above the input (Mantine-style) */
    label?: string;
    /** Sub-label / hint rendered below the input */
    description?: string;
    /** Sets the input into error state */
    error?: boolean;
    /**
     * When `error` is true and this is provided it replaces `description`.
     * If omitted the description is still shown in red.
     */
    errorMessage?: string;
    /** Whether the field is required (shows red asterisk) */
    required?: boolean;
    /** Whether the field is disabled */
    disabled?: boolean;
    /** Placeholder text when nothing is selected */
    placeholder?: string;
    /** Show a loading spinner instead of the dropdown */
    loading?: boolean;
    /** Allow the user to clear the selection */
    clearable?: boolean;
    /** Custom id override */
    id?: string;
    /** Extra sx passed to the outer wrapper Box */
    sx?: object;
    /** Filter function – defaults to case-insensitive label match */
    filterOption?: (option: SelectOption, query: string) => boolean;
    /** Text shown when no options match the search query */
    noOptionsText?: string;
}

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
const defaultFilter = (option: SelectOption, query: string) =>
    option.label.toLowerCase().includes(query.toLowerCase());

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
const CustomSelectInput = forwardRef<HTMLDivElement, CustomSelectInputProps>(
    (
        {
            options,
            value,
            onChange,
            label,
            description,
            error = false,
            errorMessage,
            required = false,
            disabled = false,
            placeholder = "Select an option",
            loading = false,
            clearable = true,
            id: idProp,
            sx,
            filterOption = defaultFilter,
            noOptionsText = "No options",
        },
        ref
    ) => {
        const autoId = useId();
        const inputId = idProp ?? autoId;
        const searchId = `${inputId}-search`;

        /* ── State ── */
        const [open, setOpen] = useState(false);
        const [query, setQuery] = useState("");

        /* ── Refs ── */
        const anchorRef = useRef<HTMLDivElement>(null);
        const searchInputRef = useRef<HTMLInputElement>(null);

        /* ── Derived values ── */
        const selectedOption = options.find((o) => o.value === value) ?? null;
        const filtered = query ? options.filter((o) => filterOption(o, query)) : options;
        const helperText = error ? (errorMessage ?? description) : description;

        /* ── Handlers ── */
        const openDropdown = useCallback(() => {
            if (disabled || loading) return;
            setOpen(true);
        }, [disabled, loading]);

        const closeDropdown = useCallback(() => {
            setOpen(false);
            setQuery("");
        }, []);

        const selectOption = useCallback(
            (opt: SelectOption) => {
                onChange?.(opt.value, opt);
                closeDropdown();
            },
            [onChange, closeDropdown]
        );

        const clearSelection = useCallback(
            (e: React.MouseEvent) => {
                e.stopPropagation();
                onChange?.(null, null);
            },
            [onChange]
        );

        /* Focus the search box as soon as the popper appears */
        useEffect(() => {
            if (open) {
                // Small timeout ensures the popper has painted
                const t = setTimeout(() => searchInputRef.current?.focus(), 50);
                return () => clearTimeout(t);
            }
        }, [open]);

        /* ── Colours / tokens (mirrors text-input) ── */
        const borderColor = error
            ? "error.main"
            : open
                ? "primary.main"
                : "rgba(0,0,0,0.23)";

        const showClear = clearable && selectedOption !== null && !disabled;

        return (
            <Box
                ref={ref}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    ...(typeof sx === "object" ? sx : {}),
                }}
            >
                {/* ── Mantine-style external label ── */}
                {label && (
                    <Typography
                        component="label"
                        htmlFor={inputId}
                        sx={{
                            display: "inline-flex",
                            alignItems: "baseline",
                            gap: "2px",
                            fontSize: "0.8rem",
                            fontWeight: 500,
                            color: disabled ? "text.disabled" : "text.primary",
                            mb: "4px",
                            lineHeight: 1.4,
                            userSelect: "none",
                        }}
                    >
                        {label}

                        {/* Mandatory asterisk – matches Mantine's red star */}
                        {required && (
                            <Box
                                component="span"
                                aria-hidden="true"
                                sx={{
                                    color: "error.main",
                                    fontSize: "0.75rem",
                                    lineHeight: 1,
                                    ml: "1px",
                                    fontWeight: 700,
                                }}
                            >
                                *
                            </Box>
                        )}
                    </Typography>
                )}

                {/* ── Control box (the visible "input") ── */}
                <Box
                    ref={anchorRef}
                    id={inputId}
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    aria-controls={`${inputId}-listbox`}
                    aria-label={label}
                    tabIndex={disabled ? -1 : 0}
                    onClick={openDropdown}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") openDropdown();
                        if (e.key === "Escape") closeDropdown();
                    }}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        border: "1px solid",
                        borderColor,
                        borderRadius: "4px",
                        px: "14px",
                        py: "0px",
                        cursor: disabled ? "not-allowed" : "pointer",
                        backgroundColor: disabled
                            ? "action.disabledBackground"
                            : "background.paper",
                        transition: "border-color 0.2s",
                        outline: "none",
                        "&:focus-visible": {
                            boxShadow: (theme) =>
                                `0 0 0 2px ${theme.palette.primary.main}40`,
                        },
                        minHeight: "35px"
                    }}
                >
                    {/* Displayed value / placeholder */}
                    <Typography
                        sx={{
                            flex: 1,
                            fontSize: "0.8rem",
                            color: selectedOption
                                ? disabled
                                    ? "text.disabled"
                                    : "text.primary"
                                : "text.disabled",
                            lineHeight: 1.4,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {selectedOption ? selectedOption.label : placeholder}
                    </Typography>

                    {/* Loading spinner */}
                    {loading && (
                        <CircularProgress size={16} color="inherit" sx={{ flexShrink: 0 }} />
                    )}

                    {/* Clear button */}
                    {showClear && !loading && (
                        <IconButton
                            size="small"
                            tabIndex={-1}
                            aria-label="Clear selection"
                            onClick={clearSelection}
                            sx={{
                                p: 0,
                                color: "text.secondary",
                                flexShrink: 0,
                                "&:hover": { color: "error.main" },
                            }}
                        >
                            <ClearIcon sx={{ fontSize: "1rem" }} />
                        </IconButton>
                    )}

                    {/* Chevron */}
                    {!loading && (
                        <KeyboardArrowDownIcon
                            sx={{
                                fontSize: "1.25rem",
                                color: "text.secondary",
                                flexShrink: 0,
                                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.2s",
                            }}
                        />
                    )}
                </Box>

                {/* ── Dropdown Popper ── */}
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    placement="bottom-start"
                    modifiers={[{ name: "offset", options: { offset: [0, 4] } }]}
                    style={{ zIndex: 99999, width: anchorRef.current?.offsetWidth }}
                >
                    <ClickAwayListener onClickAway={closeDropdown}>
                        <Paper
                            elevation={4}
                            sx={{ borderRadius: "6px", overflow: "hidden" }}
                        >
                            {/* Search box inside the dropdown */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    px: 1.5,
                                    py: 0.75,
                                    borderBottom: "1px solid",
                                    borderColor: "divider",
                                    gap: 1,
                                }}
                            >
                                <SearchIcon
                                    sx={{ fontSize: "1rem", color: "text.secondary", flexShrink: 0 }}
                                />
                                <InputBase
                                    id={searchId}
                                    inputRef={searchInputRef}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search…"
                                    fullWidth
                                    inputProps={{
                                        "aria-label": "Search options",
                                        "aria-controls": `${inputId}-listbox`,
                                        "aria-autocomplete": "list",
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Escape") closeDropdown();
                                    }}
                                    sx={{ fontSize: "0.8rem" }}
                                />
                                {query && (
                                    <IconButton
                                        size="small"
                                        tabIndex={-1}
                                        aria-label="Clear search"
                                        onClick={() => setQuery("")}
                                        sx={{ p: 0, color: "text.secondary" }}
                                    >
                                        <ClearIcon sx={{ fontSize: "0.9rem" }} />
                                    </IconButton>
                                )}
                            </Box>

                            {/* Options list */}
                            <Box
                                id={`${inputId}-listbox`}
                                role="listbox"
                                aria-label={label ?? "Options"}
                                sx={{
                                    maxHeight: 240,
                                    overflowY: "auto",
                                    py: 0.5,
                                }}
                            >
                                {filtered.length === 0 ? (
                                    <Typography
                                        sx={{
                                            px: 2,
                                            py: 1.5,
                                            fontSize: "0.8rem",
                                            color: "text.disabled",
                                            textAlign: "center",
                                        }}
                                    >
                                        {noOptionsText}
                                    </Typography>
                                ) : (
                                    filtered.map((opt) => {
                                        const isSelected = opt.value === value;
                                        return (
                                            <Box
                                                key={opt.value}
                                                role="option"
                                                aria-selected={isSelected}
                                                onClick={() => selectOption(opt)}
                                                sx={{
                                                    px: 2,
                                                    py: "9px",
                                                    fontSize: "0.8rem",
                                                    cursor: "pointer",
                                                    backgroundColor: isSelected
                                                        ? "primary.main"
                                                        : "transparent",
                                                    color: isSelected
                                                        ? "primary.contrastText"
                                                        : "text.primary",
                                                    "&:hover": {
                                                        backgroundColor: isSelected
                                                            ? "primary.dark"
                                                            : "action.hover",
                                                    },
                                                    transition: "background-color 0.15s",
                                                    lineHeight: 1.4,
                                                }}
                                            >
                                                {opt.label}
                                            </Box>
                                        );
                                    })
                                )}
                            </Box>
                        </Paper>
                    </ClickAwayListener>
                </Popper>

                {/* ── Mantine-style description / error message ── */}
                {helperText && (
                    <Typography
                        sx={{
                            mt: "6px",
                            fontSize: "0.6rem",
                            lineHeight: 1.45,
                            color: error ? "error.main" : "text.secondary",
                        }}
                    >
                        {helperText}
                    </Typography>
                )}
            </Box>
        );
    }
);

CustomSelectInput.displayName = "CustomSelectInput";

export default CustomSelectInput;
