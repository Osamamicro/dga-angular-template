import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  ElementRef,
  viewChild,
} from '@angular/core';

export interface DgaUploadedFile {
  file: File;
  progress: number;
  error?: string;
}

@Component({
  selector: 'dga-file-upload',
  standalone: true,
  templateUrl: './dga-file-upload.component.html',
  styleUrls: ['./dga-file-upload.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgaFileUploadComponent {
  /** Accepted file types (e.g. ".pdf,.jpg") */
  accept = input<string>('');

  /** Maximum file size in bytes */
  maxSize = input<number>(10 * 1024 * 1024); // 10MB default

  /** Whether multiple files are allowed */
  multiple = input<boolean>(false);

  /** Whether the component is disabled */
  disabled = input<boolean>(false);

  /** Label text */
  label = input<string>('Upload files');

  /** Helper text */
  helperText = input<string>('');

  /** Emits when files are selected */
  filesSelected = output<File[]>();

  /** Emits when a file is removed */
  fileRemoved = output<File>();

  /** Internal file list */
  files = signal<DgaUploadedFile[]>([]);

  /** Drag state */
  isDragOver = signal(false);

  /** File input reference */
  fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInputRef');

  /** Zone classes */
  zoneClasses = computed(() => {
    const classes = ['dga-file-upload__zone'];
    if (this.isDragOver()) classes.push('dga-file-upload__zone--dragover');
    if (this.disabled()) classes.push('dga-file-upload__zone--disabled');
    return classes.join(' ');
  });

  /** Open file dialog */
  openFileDialog(): void {
    if (this.disabled()) return;
    this.fileInput()?.nativeElement.click();
  }

  /** Handle file input change */
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(Array.from(input.files));
      input.value = '';
    }
  }

  /** Handle drop */
  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(false);
    if (this.disabled()) return;

    const droppedFiles = event.dataTransfer?.files;
    if (droppedFiles) {
      this.addFiles(Array.from(droppedFiles));
    }
  }

  /** Handle dragover */
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (!this.disabled()) {
      this.isDragOver.set(true);
    }
  }

  /** Handle dragleave */
  onDragLeave(): void {
    this.isDragOver.set(false);
  }

  /** Remove a file */
  removeFile(index: number): void {
    const file = this.files()[index];
    this.files.update((current) => current.filter((_, i) => i !== index));
    if (file) {
      this.fileRemoved.emit(file.file);
    }
  }

  /** Add files with validation */
  private addFiles(newFiles: File[]): void {
    const maxSize = this.maxSize();
    const acceptPattern = this.accept();
    const validFiles: DgaUploadedFile[] = [];

    for (const file of newFiles) {
      if (maxSize && file.size > maxSize) {
        validFiles.push({ file, progress: 0, error: 'File too large' });
        continue;
      }

      if (acceptPattern && !this.isAcceptedType(file, acceptPattern)) {
        validFiles.push({ file, progress: 0, error: 'Invalid file type' });
        continue;
      }

      validFiles.push({ file, progress: 100 });
    }

    if (this.multiple()) {
      this.files.update((current) => [...current, ...validFiles]);
    } else {
      this.files.set(validFiles.slice(0, 1));
    }

    const accepted = validFiles.filter((f) => !f.error).map((f) => f.file);
    if (accepted.length > 0) {
      this.filesSelected.emit(accepted);
    }
  }

  /** Check if file matches accepted types */
  private isAcceptedType(file: File, accept: string): boolean {
    const types = accept.split(',').map((t) => t.trim().toLowerCase());
    const fileName = file.name.toLowerCase();
    const fileType = file.type.toLowerCase();

    return types.some((type) => {
      if (type.startsWith('.')) {
        return fileName.endsWith(type);
      }
      if (type.endsWith('/*')) {
        return fileType.startsWith(type.replace('/*', '/'));
      }
      return fileType === type;
    });
  }

  /** Format file size for display */
  formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}
