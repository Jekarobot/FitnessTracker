import React, { useState } from 'react';

const FitnessTrackerForm: React.FC = () => {
  const [formData, setFormData] = useState({ date: '', steps: 0 });
  const [days, setDays] = useState<{ date: string; steps: number }[]>([]);

  const handleAddDay = () => {
    if (days.some((day) => day.date === formData.date)) {
        setDays(days.map((day) => day.date === formData.date ? { ...day, steps: day.steps + formData.steps } : day));
    } else {
        const newDay = { date: formData.date, steps: formData.steps };
        setDays(sortDaysByDate([...days, newDay]));
        setFormData({ date: '', steps: 0 });
    }
  };

  const handleEditDay = (index: number) => {
    const day = days[index];
    setFormData({ date: day.date, steps: day.steps });
    setDays(days.filter((_, i) => i !== index));
  };

  const handleDeleteDay = (index: number) => {
    setDays(days.filter((_, i) => i !== index));
  };

  const sortDaysByDate = (days: { date: string; steps: number }[]) => {
    return days.slice().sort((a, b) => new Date(b.date).getDate() - new Date(a.date).getDate());
  }

  return (
    <div className='tracker'>
    <div className='menu'>
      <input className='date' type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
      <input className='steps' type="number" value={formData.steps} onChange={(e) => setFormData({ ...formData, steps: parseInt(e.target.value) || 0 })} />
      <button className='add-day' onClick={handleAddDay}>Добавить день</button>
    </div>
      <ul className='days'>
        {sortDaysByDate(days).slice(-5).map((day, index) => (
          <li className='day' key={index}>
            {day.date} - {day.steps} steps
            <button onClick={() => handleEditDay(index)}>Редактировать</button>
            <button onClick={() => handleDeleteDay(index)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FitnessTrackerForm;