import { forwardRef, useId } from "react";
import {
    Box,
    Typography,
    TextField,
    type TextFieldProps,
} from "@mui/material";

/* ─────────────────────────────────────────────
   Props
   – We forward all native MUI TextFieldProps
   – We shadow `label` to keep it as a plain string (same as MUI)
   – We add `description` and `errorMessage` (Mantine extras)
   – `size` stays as MUI's "small" | "medium"
───────────────────────────────────────────── */
export interface CustomTextInputProps
    extends Omit<TextFieldProps, "label" | "helperText" | "variant"> {
    /** Static label rendered above the input (Mantine-style) */
    label?: string;
    /** Sub-label / hint rendered below the input */
    description?: string;
    /**
     * When `error` is true and this is provided it replaces `description`.
     * If omitted the description is still shown in red.
     */
    errorMessage?: string;
}

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
const CustomTextInput = forwardRef<HTMLDivElement, CustomTextInputProps>(
    (
        {
            label,
            description,
            errorMessage,
            required = false,
            error = false,
            disabled = false,
            id: idProp,
            sx,
            slotProps,
            ...rest
        },
        ref
    ) => {
        /* Give the input a stable id so the <label htmlFor> wires up properly */
        const autoId = useId();
        const inputId = idProp ?? autoId;

        const helperText = error ? (errorMessage ?? description) : description;

        return (
            <Box
                ref={ref}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    /* Allow callers to spread extra sx without losing the above */
                    ...(typeof sx === "function" ? undefined : sx),
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
                            /* Use MUI's text.primary so it honours dark/light themes */
                            color: disabled ? "text.disabled" : "text.primary",
                            mb: "4px",
                            lineHeight: 1.2,
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
                                    color: "error.main",   /* MUI theme token = red */
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

                {/* ── MUI TextField – pure MUI look & feel ── */}
                <TextField
                    id={inputId}
                    variant="outlined"
                    /* Do NOT pass `label` here – we rendered it externally above */
                    error={error}
                    required={required}
                    disabled={disabled}
                    fullWidth
                    size="small"
                    slotProps={{
                        ...slotProps,
                        inputLabel: {
                            /* Hide the default MUI floating label entirely */
                            shrink: false,
                            sx: { display: "none" },
                            ...((slotProps?.inputLabel as Record<string, unknown>) ?? {}),
                        },
                    }}
                    sx={{
                        /* ── notched outline: remove the gap left for a floating label ── */
                        "& .MuiOutlinedInput-root": {
                            "& legend": { display: "none" },
                            "& fieldset": { top: 0 },
                            borderRadius: "4px",
                            backgroundColor: "#FFFFFF",
                        },
                        /* ── custom size: between MUI small (~40px) and medium (~56px) ── */
                        "& .MuiOutlinedInput-input": {
                            // paddingTop: "6px",
                            // paddingBottom: "6px",
                            fontSize: "0.8rem",
                            "&::placeholder": {
                                fontSize: "0.8rem",
                            },
                        },
                    }}
                    {...rest}
                />

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

CustomTextInput.displayName = "CustomTextInput";

export default CustomTextInput;
