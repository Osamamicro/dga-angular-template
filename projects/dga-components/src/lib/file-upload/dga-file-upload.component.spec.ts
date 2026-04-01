import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DgaFileUploadComponent } from './dga-file-upload.component';

@Component({
  standalone: true,
  imports: [DgaFileUploadComponent],
  template: `
    <dga-file-upload
      [accept]="accept()"
      [maxSize]="maxSize()"
      [multiple]="multiple()"
      [disabled]="disabled()"
      [label]="label()"
      [helperText]="helperText()"
      (filesSelected)="onFilesSelected($event)"
      (fileRemoved)="onFileRemoved($event)"
    ></dga-file-upload>
  `,
})
class TestHostComponent {
  accept = signal('');
  maxSize = signal(10 * 1024 * 1024);
  multiple = signal(false);
  disabled = signal(false);
  label = signal('Upload files');
  helperText = signal('Max 10MB');
  selectedFiles: File[] = [];
  removedFile: File | null = null;

  onFilesSelected(files: File[]): void {
    this.selectedFiles = files;
  }

  onFileRemoved(file: File): void {
    this.removedFile = file;
  }
}

function createMockFile(name: string, size: number, type: string): File {
  const content = new Array(size).fill('a').join('');
  return new File([content], name, { type });
}

describe('DgaFileUploadComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  function getZone(): HTMLElement {
    return fixture.nativeElement.querySelector('.dga-file-upload__zone');
  }

  function getFileInput(): HTMLInputElement {
    return fixture.nativeElement.querySelector('.dga-file-upload__input');
  }

  function getFileItems(): HTMLElement[] {
    return Array.from(
      fixture.nativeElement.querySelectorAll('.dga-file-upload__file')
    );
  }

  it('should create the file upload', () => {
    expect(getZone()).toBeTruthy();
  });

  it('should render label', () => {
    const label = fixture.nativeElement.querySelector('.dga-file-upload__label');
    expect(label.textContent).toContain('Upload files');
  });

  it('should render helper text', () => {
    const helper = fixture.nativeElement.querySelector('.dga-file-upload__helper');
    expect(helper.textContent).toContain('Max 10MB');
  });

  it('should have role="button" on zone', () => {
    expect(getZone().getAttribute('role')).toBe('button');
  });

  it('should have keyboard support on zone', () => {
    expect(getZone().getAttribute('tabindex')).toBe('0');
  });

  it('should have hidden file input', () => {
    const input = getFileInput();
    expect(input).toBeTruthy();
    expect(input.getAttribute('aria-hidden')).toBe('true');
  });

  it('should show drag-over state', () => {
    const zone = getZone();
    zone.dispatchEvent(new Event('dragover', { bubbles: true }));
    fixture.detectChanges();

    expect(zone.classList.contains('dga-file-upload__zone--dragover')).toBe(true);
  });

  it('should remove drag-over state on drag leave', () => {
    const zone = getZone();
    zone.dispatchEvent(new Event('dragover', { bubbles: true }));
    fixture.detectChanges();

    zone.dispatchEvent(new Event('dragleave', { bubbles: true }));
    fixture.detectChanges();

    expect(zone.classList.contains('dga-file-upload__zone--dragover')).toBe(false);
  });

  it('should apply disabled state', () => {
    host.disabled.set(true);
    fixture.detectChanges();

    expect(getZone().classList.contains('dga-file-upload__zone--disabled')).toBe(true);
  });

  it('should show remove button with aria-label', () => {
    // Simulate file selection by directly calling the component
    const component = fixture.debugElement.children[0].componentInstance as DgaFileUploadComponent;
    const mockFile = createMockFile('test.pdf', 1024, 'application/pdf');
    component.files.set([{ file: mockFile, progress: 100 }]);
    fixture.detectChanges();

    const removeBtn = fixture.nativeElement.querySelector('.dga-file-upload__remove');
    expect(removeBtn).toBeTruthy();
    expect(removeBtn.getAttribute('aria-label')).toBe('Remove test.pdf');
  });

  it('should remove a file when remove button is clicked', () => {
    const component = fixture.debugElement.children[0].componentInstance as DgaFileUploadComponent;
    const mockFile = createMockFile('test.pdf', 1024, 'application/pdf');
    component.files.set([{ file: mockFile, progress: 100 }]);
    fixture.detectChanges();

    expect(getFileItems().length).toBe(1);

    const removeBtn = fixture.nativeElement.querySelector('.dga-file-upload__remove');
    removeBtn.click();
    fixture.detectChanges();

    expect(getFileItems().length).toBe(0);
  });

  it('should format file sizes correctly', () => {
    const component = fixture.debugElement.children[0].componentInstance as DgaFileUploadComponent;
    expect(component.formatSize(500)).toBe('500 B');
    expect(component.formatSize(1024)).toBe('1.0 KB');
    expect(component.formatSize(1048576)).toBe('1.0 MB');
  });
});
