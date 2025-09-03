import * as React from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Stack,
  TextField,
  IconButton,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm, useWatch } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { BASE_URL, toastAlert } from "../../utils";
import { apiEndPoints } from "../../constant/apiEndPoints";

export default function AddCourse({ open, setOpen, handleClose, setRefresh }) {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      title: "",
      desc: "",
      video: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log(data)
      setLoading(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("desc", data.desc);
      if (data.video) {
        formData.append("video", data.video);
      }
      const api = `${BASE_URL}${apiEndPoints.createCourse}`;
      const response = await axios.post(api, formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      reset();
      toastAlert({
        type: "success",
        message: "Course Created Successfully!",
      });

      setLoading(false);
      setRefresh((prev) => !prev);
      handleClose();
    } catch (error) {
      setLoading(false);
      toastAlert({
        type: "error",
        message: error?.response?.data?.message || error.message,
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="create-loan-modal"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5" fontWeight="bold" color="#1B5E20">
            Create Course
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="title"
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <TextField
                label="Course Title"
                fullWidth
                variant="outlined"
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="desc"
            render={({ field }) => (
              <TextField
                label="Course Description"
                fullWidth
                variant="outlined"
                multiline
                rows={2}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="video"
            render={({ field: { onChange } }) => (
              <Button variant="outlined" component="label">
                Upload Video
                <input
                  type="file"
                  hidden
                  accept="video/*"
                  onChange={(e) => onChange(e.target.files[0])}
                />
              </Button>
            )}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#2E7D32" }}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Course"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
