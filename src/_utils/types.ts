export interface WebDavEventType {
  type:
    | 'open.directory'
    | 'open.file'
    | 'delete.file'
    | 'upload.file'
    | 'download.file'
    | 'refresh.directory'
    | 'create.directory';
  value?: any;
}
