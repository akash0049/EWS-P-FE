import { forwardRef, useId } from "react";
import {
    Box,
    Typography,
    TextField,
    type TextFieldProps,
} from "@mui/material";

/* ─────────────────────────────────────────────
   Props
───────────────────────────────────────────── */
export interface CustomTextInputProps
    extends Omit<TextFieldProps, "label" | "helperText" | "variant"> {
    /** Static label rendered above the input (Mantine-style) */
    label?: string;
    /** Sub-label / hint rendered below the input */
    description?: string;
    /**
     * When `error` is true and this is provided it replaces `description`.
     */
    errorMessage?: string;
    /** Makes the input read-only (prevents editing but allows selection/copying) */
    readOnly?: boolean;
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
            readOnly = false, // <-- Destructured the new prop here
            id: idProp,
            sx,
            slotProps,
            ...rest
        },
        ref
    ) => {
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
                            color: disabled ? "text.disabled" : "text.primary",
                            mb: "4px",
                            lineHeight: 1.4,
                            userSelect: "none",
                        }}
                    >
                        {label}

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

                {/* ── MUI TextField ── */}
                <TextField
                    id={inputId}
                    variant="outlined"
                    error={error}
                    required={required}
                    disabled={disabled}
                    fullWidth
                    size="small"
                    slotProps={{
                        ...slotProps,
                        inputLabel: {
                            shrink: false,
                            sx: { display: "none" },
                            ...((slotProps?.inputLabel as Record<string, unknown>) ?? {}),
                        },
                        // Pass readOnly down to the underlying MUI Input component
                        input: {
                            readOnly: readOnly,
                            ...((slotProps?.input as Record<string, unknown>) ?? {}),
                        },
                    }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& legend": { display: "none" },
                            "& fieldset": { top: 0 },
                            borderRadius: "4px",
                            backgroundColor: "#FFFFFF",
                            minHeight: "35px",

                            "&.MuiInputBase-multiline": {
                                padding: "8px 14px",
                            },
                            // Visual cue for readOnly state (slightly greyed out)
                            "&.Mui-readOnly": {
                                backgroundColor: "#f8fafc", // Tailwind slate-50 equivalent
                                cursor: "default",
                            },
                        },
                        "& .MuiOutlinedInput-input": {
                            fontSize: "0.8rem",
                            padding: "7.5px 14px",
                            height: "20px",
                            boxSizing: "border-box",
                            "&::placeholder": {
                                fontSize: "0.8rem",
                            },
                            // Ensure the cursor isn't a text I-beam if you don't want it to look editable
                            // Remove this line if you still want users to feel they can click and drag to copy text
                            "&.Mui-readOnly": {
                                color: "text.secondary",
                            }
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