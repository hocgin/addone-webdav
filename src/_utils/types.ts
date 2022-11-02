export interface WebDavEventType {
  type:
    | 'open.directory'
    | 'open.file'
    | 'delete.file'
    | 'upload.file'
    | 'upload.directory'
    | 'move.file'
    | 'move.directory'
    | 'preview.file'
    | 'preview.directory'
    | 'download.file'
    | 'download.directory'
    | 'refresh.directory'
    | 'create.directory';
  value?: any;
}
