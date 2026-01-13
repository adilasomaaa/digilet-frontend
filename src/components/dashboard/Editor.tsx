import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Card, CardBody } from '@heroui/react';
import { 
  ClassicEditor,
	Autosave,
	Essentials,
	Paragraph,
	Autoformat,
	TextTransformation,
	TableColumnResize,
	Table,
	TableToolbar,
	TableCaption,
	TableCellProperties,
	TableProperties,
	Heading,
	Link,
	AutoLink,
	Bookmark,
	BlockQuote,
	HorizontalLine,
	CodeBlock,
	Indent,
	IndentBlock,
	Alignment,
	List,
	TodoList,
	ListProperties,
	ShowBlocks,
	GeneralHtmlSupport,
	HtmlEmbed,
	HtmlComment,
	FullPage,
  Bold,
  Italic,
  Underline
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

interface EditorProps {
  value: string;
  onChange: (data: string) => void;
}

const Editor = ({ value, onChange }: EditorProps) => {
  return (
    <Card className="w-full shadow-sm border-default-200">
      <CardBody className="p-0">
        <div className="prose-full-width">
          <style>{`
          .ck-editor__editable_inline {
            min-height: 450px;
            padding: 0 20px !important;
          }
          /* Memastikan teks editor selalu terlihat (tidak putih di background putih) */
          .ck-content {
            color: black !important;
            font-family: 'Inter', sans-serif;
          }
          /* Styling khusus untuk Heading agar ukurannya proporsional */
          .ck-content h1 { font-size: 2em; font-weight: bold; }
          .ck-content h2 { font-size: 1.5em; font-weight: bold; }
          .ck-content h3 { font-size: 1.2em; font-weight: bold; }
          .ck-content h4 { font-size: 1.1em; font-weight: bold; }
        `}</style>
          <CKEditor
            editor={ClassicEditor}
            data={value}
            config={{
                licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjkyMTI3OTksImp0aSI6ImEzMmFjYmE4LTVlZjQtNGI3Yi1iMzk4LWM5Y2NkNDI5NDA1MiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjI2MTkyYzQ2In0.x1nFS3dBZwR_1in2COz0Z92mQA-HByoQMQz4lD9b2NoaCOkAqtVxR6KHDdvwDjxZRlgd-c3f4J4psNJJMyEzhw',
                plugins: [ 
                  Bold,
                  Italic,
                  Underline,
                  Alignment,
                  Autoformat,
                  AutoLink,
                  Autosave,
                  BlockQuote,
                  Bookmark,
                  CodeBlock,
                  Essentials,
                  FullPage,
                  GeneralHtmlSupport,
                  Heading,
                  HorizontalLine,
                  HtmlComment,
                  HtmlEmbed,
                  Indent,
                  IndentBlock,
                  Link,
                  List,
                  ListProperties,
                  Paragraph,
                  ShowBlocks,
                  Table,
                  TableCaption,
                  TableCellProperties,
                  TableColumnResize,
                  TableProperties,
                  TableToolbar,
                  TextTransformation,
                  TodoList 
                ],
                toolbar: [ 
                    'bold',
                    'italic',
                    'underline',
                    'undo',
                    'redo',
                    '|',
                    'sourceEditingEnhanced',
                    'showBlocks',
                    '|',
                    'heading',
                    '|',
                    'horizontalLine',
                    'link',
                    'insertTable',
                    'blockQuote',
                    '|',
                    'alignment',
                    'lineHeight',
                    '|',
                    'bulletedList',
                    'numberedList',
                    'multiLevelList',
                    'todoList',
                    'outdent',
                    'indent'
                ],
                alignment: {
                  options: ['left', 'center', 'right', 'justify']
                },
                table: {
                  contentToolbar: [
                    'tableColumn', 'tableRow', 'mergeTableCells', 
                    'tableProperties', 'tableCellProperties'
                  ]
                },
                heading: {
                  options: [
                    { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                    { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                    { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                    { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                    { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' } // Tambahkan H4 di sini
                  ]
                }
            }}
            onChange={(event, editor) => {
                onChange(editor.getData());
            }}
        />
        </div>
      </CardBody>
    </Card>
  );
};

export default Editor;