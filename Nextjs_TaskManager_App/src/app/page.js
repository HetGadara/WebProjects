'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { List, ListItem } from '@/components/ui/list';
import { Trash2, Edit } from 'lucide-react';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const addTask = () => {
    if (!task.trim()) return;
    if (editingIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = task;
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, task]);
    }
    setTask('');
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setTask(tasks[index]);
    setEditingIndex(index);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4'>
      <Card className='w-full max-w-md p-6 shadow-lg bg-gray-800/80 backdrop-blur-lg rounded-2xl border border-gray-700'>
        <CardContent>
          <h1 className='text-2xl font-bold mb-4 text-center text-gray-800'>📝 Task Manager</h1>
          <div className='flex gap-2 mb-4 '>
            <Input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder='Enter a task...'
              className='bg-gray-700 text-white border-gray-600 rounded-xl p-4 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 size-full'
            />
            <Button
              onClick={addTask}
              className='bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6 py-3 rounded-lg shadow-md transform transition duration-300 hover:scale-105'
            >
              {editingIndex !== null ? 'Update' : 'Add'}
            </Button>
          </div>
          <List className='space-y-4'>
            {tasks.map((t, index) => (
              <ListItem
                key={index}
                className='flex justify-between items-center p-4 bg-gray-800 text-white border border-gray-600 rounded-lg hover:bg-gray-700 hover:shadow-lg transition-all duration-300'
              >
                <span>{t}</span>
                <div className='flex gap-3'>
                  <Button
                    size='md'
                    variant='outline'
                    onClick={() => editTask(index)}
                    className='text-yellow-300 border-yellow-300  hover:text-black rounded-full transition-all'
                  >
                    <Edit size={20} />
                  </Button>
                  <Button
                    size='md'
                    variant='destructive'
                    onClick={() => deleteTask(index)}
                    className='text-red-300 border-red-300 hover:text-black rounded-full transition-all'
                  >
                    <Trash2 size={20} />
                  </Button>
                </div>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </div>
  );
}
