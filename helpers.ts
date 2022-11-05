export const getUserName = (email: string) => {
  return (
    {
      "d3x133@gmail.com": "Dmitry",
      "eva.zhuk@gmail.com": "Eva",
      "bill.gates@outlook.com": "Billy",
    }[email] ?? email
  )
}
