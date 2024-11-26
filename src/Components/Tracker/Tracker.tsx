import React, { useState } from 'react';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';

const FitnessTrackerForm: React.FC = () => {
  const [formData, setFormData] = useState({ date: '', steps: 0 });
  const [days, setDays] = useState<{ date: string; steps: number }[]>([]);

  const handleAddDay = () => {
    if (formData.date.trim() === '') {
        alert('Пожалуйста, введите дату.');
        return; // Прекращаем выполнение функции если дата не введена
      }
      
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
    <div className='dateContainer'>
      <p>Введите дату</p>
      <input className='date' type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })}/>
    </div>
    <div className='stepsContainer'>
      <p>Введите количество шагов</p>
      <input className='steps' type="number" value={formData.steps} onChange={(e) => setFormData({ ...formData, steps: parseInt(e.target.value)})} />
    </div>
      <button className='add-day' onClick={handleAddDay}>Добавить день</button>
    </div>
      <ul className='days'>
        <div className='title'>
          <p>Дата - Количество шагов</p>
          <p>Действия</p>
        </div>
        {sortDaysByDate(days).slice(-5).map((day, index) => (
          <li className='day' key={index}>
            {day.date} - {day.steps} steps
            <div className='btnsContainer'>
            <button className='editBtn' onClick={() => handleEditDay(index)}><FaPencilAlt /></button>
            <button className='deleteBtn' onClick={() => handleDeleteDay(index)}><FaTimes /></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FitnessTrackerForm;