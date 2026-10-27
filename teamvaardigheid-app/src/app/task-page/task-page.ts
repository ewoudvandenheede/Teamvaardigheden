import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './task-page.html',
  styleUrl: './task-page.css'
})
export class TaskPage {
  private taskService = inject(TaskService);

  // Gebruik de geordende lijst uit de service
  tasks = this.taskService.sortedTasks;

  // Formulier-state
  isEditing = false;
  editingTaskId: string | null = null;

  taskForm = {
    title: '',
    description: '',
    dueDate: ''
  };

  saveTask(): void {
    if (!this.taskForm.title || !this.taskForm.dueDate) return;

    if (this.isEditing && this.editingTaskId) {
      // Bewerken
      this.taskService.updateTask({
        id: this.editingTaskId,
        title: this.taskForm.title,
        description: this.taskForm.description,
        dueDate: new Date(this.taskForm.dueDate)
      });
    } else {
      // Nieuw aanmaken
      this.taskService.addTask({
        title: this.taskForm.title,
        description: this.taskForm.description,
        dueDate: new Date(this.taskForm.dueDate)
      });
    }

    this.resetForm();
  }

  editTask(task: Task): void {
    this.isEditing = true;
    this.editingTaskId = task.id;
    this.taskForm = {
      title: task.title,
      description: task.description,
      dueDate: new Date(task.dueDate).toISOString().split('T')[0]
    };
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id);
  }

  resetForm(): void {
    this.isEditing = false;
    this.editingTaskId = null;
    this.taskForm = { title: '', description: '', dueDate: '' };
  }
}
