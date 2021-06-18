import { Injectable } from '@angular/core';
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor(private messageService: MessageService) { }

  success(message: string, title?: string) {
    this.messageService.add({ summary: title, severity: 'success', detail: message })
  }

  info(message: string, title?: string) {
    this.messageService.add({ summary: title, severity: 'info', detail: message })
  }

  warn(message: string, title?: string) {
    this.messageService.add({ summary: title, severity: 'warn', detail: message })
  }

  error(message: string, title?: string) {
    this.messageService.add({ summary: title, severity: 'error', detail: message })
  }
}
