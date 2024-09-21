import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const carbonData = [
  { year: 2018, credits: 100 },
  { year: 2019, credits: 150 },
  { year: 2020, credits: 200 },
  { year: 2021, credits: 300 },
  { year: 2022, credits: 400 },
]

const userData = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", credits: 50 },
  { id: 2, name: "Bob Smith", email: "bob@example.com", credits: 75 },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", credits: 100 },
  { id: 4, name: "Diana Ross", email: "diana@example.com", credits: 25 },
  { id: 5, name: "Ethan Hunt", email: "ethan@example.com", credits: 150 },
]

export default function Component() {
  const totalCredits = carbonData.reduce((sum, item) => sum + item.credits, 0)

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Carbon Credits Dashboard</h1>
        <div className="grid grid-cols-4 gap-6 mb-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Total Carbon Credits</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{totalCredits}</p>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Carbon Credits Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={carbonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="credits" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>User Data</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Credits</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userData.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.credits}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}