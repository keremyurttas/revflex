"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import theme from "@/theme/theme";
import { ThemeProvider } from "@emotion/react";
import Avatar from "@mui/material/Avatar";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const CommentedCard = () => {
  return (
    <ThemeProvider theme={theme}>
      <Card
        tabIndex={0}
        sx={{
          cursor: "pointer",
          width: 450,
          position: "relative",
          height: 500,
          bgcolor: "transparent",
          color: theme.palette.primary.main,
          [theme.breakpoints.down("lg")]: {
            height: 400,
            width: 300,
          },
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: theme.shadows[5],
            "& .hover-button": {
              color: "red",
            },
          },
        }}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          sx={{
            height: 250,
            borderRadius: "8px",
            [theme.breakpoints.down("lg")]: {
              height: 200,
            },
          }}
          image="https://play-lh.googleusercontent.com/sdg5tqwb-V7YZD9lG1zKbxvmpcVMxY6IHl1rWQLUYHVMvvlfV5yUQQ8RAtnwxA5wc9vIWm6nDCKeWVdv0fU"
        />
        <CardContent sx={{ paddingX: 0 }}>
          <Typography
            fontSize={"1.2rem"}
            fontWeight={600}
            variant="h5"
            sx={{ marginBottom: ".5rem" }}
          >
            The Batman and Friends
          </Typography>
          <Box
            sx={{
              marginBottom: ".8rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                fontSize={"1rem"}
                color={theme.palette.secondary.main}
                variant="caption"
              >
                20 min ago
              </Typography>
              {/* <Typography
                fontSize={"1rem"}
                color={theme.palette.secondary.main}
                variant="caption"
              >
                4/5
              </Typography> */}
              <Rating
                sx={{
                  "& .MuiRating-iconFilled, & .MuiRating-iconEmpty": {
                    color: theme.palette.secondary.main,
                  },

                  "&.Mui-disabled": {
                    opacity: 1,
                  },
                }}
                value={2.5}
                precision={0.5}
                disabled
              />
            </Box>
            <Typography
              fontSize={".8rem"}
              fontWeight={400}
              color={theme.palette.text.primary}
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              rem vitae ducimus saepe sequi excepturi, veritatis veniam quos
              maiores consectetur atque iusto expedita, sed ad! Autem rem earum
              ad repudiandae?Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Illum beatae cupiditate alias molestias modi a? Perspiciatis
              non accusantium, magnam officia porro repellat cupiditate, sequi
              corporis nemo iure deleniti omnis ipsam. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Atque aspernatur alias ad saepe
              aliquid deserunt voluptatem harum architecto omnis vel delectus,
              totam impedit, accusamus possimus vero praesentium ipsum explicabo
              sint.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: ".4rem",
              }}
            >
              <Avatar
                alt="commentOwner"
                src="https://mui.com/static/images/avatar/1.jpg"
              />
              <Typography fontWeight={600}>Elon Mask</Typography>
            </Box>
            <Button
              className="hover-button"
              sx={{
                textTransform: "none",
              }}
            >
              View
              <KeyboardDoubleArrowRightIcon />
            </Button>
          </Box>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};
export default CommentedCard;
