import { useState } from "react";
import { Dayjs } from "dayjs";
import {
    Box,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Grid
} from "@mui/material";
import CustomSelectInput from "../../../../components/inputs/select-input/select-input";
import RadioInput from "../../../../components/inputs/radio-input/radio-input";
import CustomDatePicker from "../../../../components/inputs/date-time-pickers/date-picker";
import CustomTimePicker from "../../../../components/inputs/date-time-pickers/time-picker";

/* ── Dialog Props ── */
interface ScheduleRuleProps {
    open: boolean;
    onClose: (value: boolean) => void;
    onSubmit?: () => void;
}

const getNumberList = (length: number) => Array.from({ length: length }, (_, i) => ({
    value: i + 1,
    label: String(i + 1),
}));

const ScheduleRule = ({ open, onClose, onSubmit }: ScheduleRuleProps) => {
    const [scheduleType, setScheduleType] = useState<string>("");

    const [scheduleFreq, setScheduleFreq] = useState<string>("");
    const [scheduleDays, setScheduleDays] = useState<string>("");
    const [day, setDay] = useState<number | null>(null);

    const [time, setTime] = useState<Dayjs | null>(null);
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [recurFreqAfter, setRecurFreqAfter] = useState<number | null>(null);

    return (
        <Dialog
            open={open}
            onClose={(_event, reason) => {
                if (reason === "backdropClick") return;
                onClose(false);
            }}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    height: "95vh",
                    borderRadius: 3,
                    overflow: "visible",
                    boxShadow: "0 24px 64px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08)",
                },
            }}
        >
            {/* ── Dialog Header ── */}
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    pb: 1,
                    pt: 2.5,
                    px: 3,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Box>
                    <Typography variant="subtitle1" fontWeight={800} letterSpacing="-0.5px" color="text.primary">
                        Schedule Rule
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25, display: "block" }}>
                        User rule to be scheduled by DQ Engagement Team
                    </Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                    gap: 1
                }}>
                    <Button
                        color="secondary"
                        variant="outlined"
                        onClick={() => onClose(false)}
                    >
                        Close
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            if (scheduleType === 'ingestionDependency' || scheduleFreq) {
                                onSubmit?.();
                                onClose(false);
                            }
                        }}
                        disabled={!scheduleType || (scheduleType === 'custom' && !scheduleFreq)}
                    >
                        Submit
                    </Button>
                </Box>
            </DialogTitle>

            {/* ── Dialog Content ── */}
            <DialogContent sx={{ mx: 2, mt: 1 }}>
                <RadioInput
                    label="Schedule Type"
                    value={scheduleType}
                    radioList={[
                        { value: 'ingestionDependency', label: 'Ingestion Dependency' },
                        { value: 'custom', label: 'Custom' }
                    ]}
                    setValue={(value: string) => setScheduleType(value)}
                />
                {scheduleType === 'custom' &&
                    <Grid container rowSpacing={2} columnSpacing={2}>
                        <Grid size={{ xs: 12 }}>
                            <CustomSelectInput
                                label="Schedule Frequency"
                                placeholder="Select a schedule frequency"
                                required
                                options={[
                                    { value: 'weekly', label: 'Weekly' },
                                    { value: 'daily', label: 'Daily' },
                                    { value: 'specificDateInAMonth', label: 'Specific Date in a Month' },
                                    { value: 'oneTime', label: 'One Time' },
                                    { value: 'workingDay', label: 'Working Day' },
                                ]}
                                value={scheduleFreq}
                                onChange={(value) => setScheduleFreq(value != null ? String(value) : "")}
                            />
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                            <CustomSelectInput
                                label="Schedule Days"
                                placeholder="Select a schedule days"
                                required
                                options={[
                                    { value: 'day', label: 'Day' },
                                ]}
                                value={scheduleDays}
                                onChange={(value) => setScheduleDays(value != null ? String(value) : "")}
                            />
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <CustomSelectInput
                                label="Day"
                                placeholder="Select a day"
                                required
                                options={getNumberList(31)}
                                value={day}
                                onChange={(value) => setDay(value !== null ? Number(value) : null)}
                            />
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                            <CustomDatePicker
                                label="Start Date"
                                required
                                value={startDate}
                                onChange={(newValue) => setStartDate(newValue)}
                            />
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                            <CustomDatePicker
                                label="End Date"
                                required
                                value={endDate}
                                onChange={(newValue) => setEndDate(newValue)}
                            />
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                            <CustomTimePicker
                                label="Time (In UTC)"
                                required
                                value={time}
                                onChange={(newValue) => setTime(newValue)}
                            />
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                            <CustomSelectInput
                                label="Recur Frequency After Month(s)"
                                placeholder="Select a month"
                                required
                                options={getNumberList(12)}
                                value={recurFreqAfter}
                                onChange={(value) => setRecurFreqAfter(value !== null ? Number(value) : null)}
                            />
                        </Grid>
                    </Grid>
                }
            </DialogContent>
        </Dialog>
    );
};

export default ScheduleRule;