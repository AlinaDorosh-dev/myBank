import Contact from "../components/Contact"
import { Box } from "@mui/material"
import { useTheme } from "@mui/material/styles"

const ContactPage = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.primary.background,
        padding: 5,
      }}
    >
      <Contact />
    </Box>
  )
}

export default ContactPage