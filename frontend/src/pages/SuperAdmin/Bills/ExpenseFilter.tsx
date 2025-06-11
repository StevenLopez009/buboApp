import { useEffect, useState } from 'react';
import { TextField, Box, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { GetRegisterBill } from '../../../api/bills';
import bgGastos from '../../../assets/bgGastos.jpg';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface BillType {
  id: number;
  brand: string;
  product: string;
  price: string; 
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

const ExpensesFilter = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [loading, setLoading] = useState(false);
  const [bills, setBills] = useState<BillType[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getBills = async () => {
      try {
        setLoading(true);
        const res = await GetRegisterBill();
        const data = Array.isArray(res.data) ? res.data : [];
        setBills(data);
        console.log("Bills fetched:", data);
        setError(null);
      } catch (err: any) {
        console.error(err);
        setError("Error al obtener servicios");
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
        getBills();
      }, []);

  const filteredExpenses = bills.filter((expense) => {
    const createdAt = dayjs(expense.createdAt);
    return (
      (!startDate || createdAt.isSameOrAfter(startDate, 'day')) &&
      (!endDate || createdAt.isSameOrBefore(endDate, 'day'))
    );
  });

   const total = filteredExpenses.reduce((acc, bill) => {
    return acc + parseFloat(bill.price) * bill.quantity;
  }, 0) ?? 0;

  return (
   <div style={{ backgroundImage: `url(${bgGastos})`,backgroundSize: 'cover', minHeight: '100vh' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ p: 4, maxWidth: 600, mx: 'auto', borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>
                Filtrar gastos por fecha
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, mb: 4, mt: 4 }}>
                <DatePicker
                  label="Fecha inicio"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
                <DatePicker
                  label="Fecha fin"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </Box>

              <Typography variant="h6" gutterBottom>
                Gastos filtrados:
              </Typography>

              <Box component="ul" sx={{ listStyle: 'none', p: 0, mb: 3 }}>
                {filteredExpenses.map((expense) => (
                  <Box key={expense.id} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1, bgcolor: '#fff' }}>
                    <Typography>
                      <strong>{expense.product}</strong> - {expense.brand} - {expense.quantity} × ${expense.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Fecha: {dayjs(expense.createdAt).format('YYYY-MM-DD')}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Box sx={{ textAlign: 'left', mt: 2 }}>
                <Typography variant="h6">
                  Total: ${total.toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </LocalizationProvider>
    </div>
  );
};

export default ExpensesFilter;


