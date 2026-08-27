"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  ALargeSmall,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Indent,
  Outdent,
  Link as LinkIcon,
  Image as ImageIcon,
  Smile,
  Minus,
  Plus,
  Undo,
  Redo,
  MoreVertical,
} from "lucide-react";

import styles from "./tiptapeditor.module.css";

export default function TiptapEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Link.configure({ openOnClick: false }),
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: styles.editorContent,
      },
    },
  });

  if (!editor) return null;

  // 문단 스타일 셀렉트 값 계산
  const getCurrentHeadingValue = () => {
    if (editor.isActive("heading", { level: 1 })) return "h1";
    if (editor.isActive("heading", { level: 2 })) return "h2";
    if (editor.isActive("heading", { level: 3 })) return "h3";
    return "p";
  };

  // 문단 스타일 전환
  const handleHeadingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "p") editor.chain().focus().setParagraph().run();
    else if (value === "h1")
      editor.chain().focus().toggleHeading({ level: 1 }).run();
    else if (value === "h2")
      editor.chain().focus().toggleHeading({ level: 2 }).run();
    else if (value === "h3")
      editor.chain().focus().toggleHeading({ level: 3 }).run();
  };

  // 이미지 첨부
  const addImage = () => {
    const url = window.prompt("이미지 URL을 입력하세요");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  // 링크 첨부
  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL을 입력하세요", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  // 이모지 삽입 예시
  const addEmoji = () => {
    const emoji = window.prompt("넣을 이모지를 입력해 주세요 (예: 😊)", "😊");
    if (emoji) editor.chain().focus().insertContent(emoji).run();
  };

  return (
    <div className={styles.container}>
      {/* 툴바 영역 */}
      <div className={styles.toolbar}>
        <div className={styles.section}>
          {/* 1. 텍스트 서식 */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`${styles.button} ${editor.isActive("bold") ? styles.active : ""}`}
            title="Bold (굵게)"
          >
            <Bold size={16} strokeWidth={2.5} />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`${styles.button} ${editor.isActive("italic") ? styles.active : ""}`}
            title="Italic (기울임)"
          >
            <Italic size={16} strokeWidth={2.5} />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`${styles.button} ${editor.isActive("underline") ? styles.active : ""}`}
            title="Underline (밑줄)"
          >
            <UnderlineIcon size={16} strokeWidth={2.5} />
          </button>

          {/* 글자색 */}
          <label
            className={styles.colorPickerLabel}
            title="Text Color (글자색)"
          >
            <ALargeSmall size={16} strokeWidth={2.5} />
            <input
              type="color"
              onChange={(e) =>
                editor.chain().focus().setColor(e.target.value).run()
              }
              value={editor.getAttributes("textStyle").color || "#000000"}
              className={styles.colorInput}
            />
          </label>

          <div className={styles.divider} />

          {/* 2. 문단 및 정렬 */}
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={`${styles.button} ${editor.isActive({ textAlign: "left" }) ? styles.active : ""}`}
            title="Align Left (좌측 정렬)"
          >
            <AlignLeft size={16} />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={`${styles.button} ${editor.isActive({ textAlign: "center" }) ? styles.active : ""}`}
            title="Align Center (중앙 정렬)"
          >
            <AlignCenter size={16} />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`${styles.button} ${editor.isActive("orderedList") ? styles.active : ""}`}
            title="Numbered List (숫자 목록)"
          >
            <ListOrdered size={16} />
          </button>
          {/* 
          <select
            value={getCurrentHeadingValue()}
            onChange={handleHeadingChange}
            className={styles.select}
            title="Paragraph Style (문단 스타일)"
          >
            <option value="p">본문</option>
            <option value="h1">제목 1</option>
            <option value="h2">제목 2</option>
            <option value="h3">제목 3</option>
          </select>
            */}
          <div className={styles.divider} />

          {/* 3. 요소 삽입 */}
          <button
            type="button"
            onClick={setLink}
            className={`${styles.button} ${editor.isActive("link") ? styles.active : ""}`}
            title="Link (링크)"
          >
            <LinkIcon size={16} />
          </button>

          <button
            type="button"
            onClick={addImage}
            className={styles.button}
            title="Image (이미지)"
          >
            <ImageIcon size={16} />
          </button>

          <button
            type="button"
            onClick={addEmoji}
            className={styles.button}
            title="Emoji (이모티콘)"
          >
            <Smile size={16} />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className={styles.button}
            title="Divider (구분선)"
          >
            <Minus size={16} />
          </button>

          <button
            type="button"
            className={styles.button}
            title="Special Insert (추가 삽입)"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* 4. 히스토리 및 기타 */}
        <div className={styles.section}>
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className={styles.button}
            title="Undo (되돌리기)"
          >
            <Undo size={16} />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className={styles.button}
            title="Redo (다시 실행)"
          >
            <Redo size={16} />
          </button>

          <button
            type="button"
            className={styles.button}
            title="More Options (더보기)"
          >
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      {/* 본문 영역 */}
      <EditorContent editor={editor} />
    </div>
  );
}
