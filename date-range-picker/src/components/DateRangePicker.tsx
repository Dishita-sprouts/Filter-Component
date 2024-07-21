import "../sass/DateRangePicker.scss";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { TextField, styled } from "@mui/material";
import arrow from '../assets/arrow.png';

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputAdornment-root": {
    right: "10px",
  },
}));

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStartDateChange = (newValue: Dayjs | null) => {
    if (endDate && newValue && newValue.isAfter(endDate)) {
      setError("Start date should be before end date.");
    } else {
      setError(null);
      setStartDate(newValue);
    }
  };

  const handleEndDateChange = (newValue: Dayjs | null) => {
    if (startDate && newValue && newValue.isBefore(startDate)) {
      setError("End date should be after start date.");
    } else {
      setError(null);
      setEndDate(newValue);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <DatePicker
          value={startDate}
          onChange={handleStartDateChange}
          shouldDisableDate={(date) =>
            endDate ? date.isAfter(endDate) : false
          }
          slots={{
            textField: CustomTextField,
          }}
          slotProps={{
            textField: {
              placeholder: "From",
              sx: {
                width: "150px",
                height: "32px",
                "& input": {
                  height: "32px",
                  padding: "0 14px",
                  fontSize: "12px",
                  color: "black",
                  fontWeight: "400",
                },
              },
            },
          }}
        />
        <img src={arrow} alt="arrowIcon" />
        <DatePicker
          value={endDate}
          onChange={handleEndDateChange}
          shouldDisableDate={(date) =>
            startDate ? date.isBefore(startDate) : false
          }
          slots={{
            textField: CustomTextField,
          }}
          slotProps={{
            textField: {
              placeholder: "To",
              sx: {
                width: "150px",
                height: "32px",
                "& input": {
                  height: "32px",
                  padding: "0 14px",
                  fontSize: "12px",
                  color: "black",
                  fontWeight: "400",
                },
              },
            },
          }}
        />
      </div>
      {error && <div style={{ color: "red", marginTop: "1rem" }}>{error}</div>}
    </LocalizationProvider>
  );
};

export default DateRangePicker;