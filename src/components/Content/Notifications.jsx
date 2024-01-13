import { FormControl, FormLabel } from '@chakra-ui/react'

function Notifications() {
  return (
    <FormControl
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <FormLabel
        htmlFor="notificationEmails"
        mb={0}
        cursor="pointer"
        userSelect="none"
      >
        Receive notification emails
      </FormLabel>
    </FormControl>
  )
}

export default Notifications
