import { Injectable, signal, computed } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSignal = signal<Task[]>([]);

  public sortedTasks = computed(() => {
    return [...this.tasksSignal()].sort((a, b) =>
      new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
  });

  addTask(taskData: Omit<Task, 'id'>): void {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID() 
    };
    this.tasksSignal.update(tasks => [...tasks, newTask]);
  }

  updateTask(updatedTask: Task): void {
    this.tasksSignal.update(tasks =>
      tasks.map(t => (t.id === updatedTask.id ? updatedTask : t))
    );
  }

  deleteTask(id: string): void {
    this.tasksSignal.update(tasks => tasks.filter(t => t.id !== id));
  }
}
