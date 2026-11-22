import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Clock,
  Star,
  Trash2,
  Search,
  Plus,
} from 'lucide-react';

interface NoteItem {
  id: string;
  title: string;
  date: string;
  preview: string;
  tag: string;
  tagColor: string;
  bg: string;
  textColor: string;
  dotColor: string;
}

const initialNotes: NoteItem[] = [
  {
    id: '1',
    title: 'Machine Learning Revision',
    date: 'Nov 20',
    preview:
      'Gradient descent, backprop, CNNs, transformers — revision notes for finals',
    tag: '#machine-learning',
    tagColor: '#7C6FFF',
    bg: '#F5F3EE',
    textColor: '#1A1A2E',
    dotColor: '#7C6FFF',
  },
  {
    id: '2',
    title: 'Project Ideas ✦',
    date: 'Nov 20',
    preview:
      'Campus nav app, stress detection with WESAD dataset, urban planning MERN stack',
    tag: '#projects',
    tagColor: '#9B8FFF',
    bg: '#EDE8FF',
    textColor: '#2D1B69',
    dotColor: '#9B8FFF',
  },
  {
    id: '3',
    title: 'Weekend Plans',
    date: 'Nov 20',
    preview: 'Morning run, finish reading, guitar session, check flight details',
    tag: '#personal',
    tagColor: '#F5A623',
    bg: '#FFF8ED',
    textColor: '#2A1800',
    dotColor: '#F5A623',
  },
  {
    id: '4',
    title: 'Research Notes',
    date: 'Nov 20',
    preview:
      'VitaStress dataset — multimodal gated fusion architecture notes',
    tag: '#research',
    tagColor: '#3B9EFF',
    bg: '#E8F4FF',
    textColor: '#0A2A4A',
    dotColor: '#3B9EFF',
  },
  {
    id: '5',
    title: 'Things to Remember',
    date: 'Nov 20',
    preview:
      'Call advisor, submit lab report Friday, haircut appointment next week',
    tag: '#personal',
    tagColor: '#3DD68C',
    bg: '#F0FFF4',
    textColor: '#0A2A14',
    dotColor: '#3DD68C',
  },
  {
    id: '6',
    title: 'Daily Journal',
    date: 'Nov 20',
    preview:
      'Reflecting on the day — grateful for productive study session',
    tag: '#personal',
    tagColor: '#FF6B9D',
    bg: '#FFF0F5',
    textColor: '#2A0A1A',
    dotColor: '#FF6B9D',
  },
];

const tagsList = ['#machine-learning', '#projects', '#personal', '#research'];

export const ProductPreview: React.FC = () => {
  const [activeNav, setActiveNav] = useState('All Notes');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNoteId, setSelectedNoteId] = useState('1');
  const [notes, setNotes] = useState<NoteItem[]>(initialNotes);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesTag = activeTag ? note.tag === activeTag : true;
      const matchesSearch = searchQuery
        ? note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.tag.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesTag && matchesSearch;
    });
  }, [notes, activeTag, searchQuery]);

  const handleCreateNote = () => {
    const newNote: NoteItem = {
      id: Date.now().toString(),
      title: 'New Idea Note',
      date: 'Just now',
      preview: 'Start writing your new thought or brainstorm right here...',
      tag: activeTag || '#personal',
      tagColor: '#7C6FFF',
      bg: '#F5F3EE',
      textColor: '#1A1A2E',
      dotColor: '#7C6FFF',
    };
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
  };

  return (
    <section
      id="about"
      className="relative w-full bg-[#0a0a0f] py-24 md:py-32 px-4 sm:px-8 lg:px-16 flex flex-col items-center justify-center overflow-hidden border-t border-white/[0.06]"
    >
      {/* Product Section Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] h-[340px] pointer-events-none z-0 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(124,111,255,0.16)_0%,rgba(13,13,20,0)_70%)]" />

      {/* Header */}
      <div className="relative z-10 flex flex-col items-center text-center gap-4 max-w-[700px] mb-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.44, 0, 0.56, 1] }}
          className="text-[11px] font-semibold text-[#9B8FFF] tracking-[0.1em] uppercase"
        >
          YOUR WORKSPACE
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.44, 0, 0.56, 1] }}
          className="text-[32px] sm:text-[44px] lg:text-[52px] font-bold text-[#F5F4F0] leading-[1.1] tracking-[-1.5px]"
        >
          A personal workspace built to think in.
        </motion.h2>
      </div>

      {/* App Shell Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.44, 0, 0.56, 1] }}
        className="relative z-10 w-full max-w-[1200px] bg-[#141420] border border-white/[0.08] rounded-t-[20px] shadow-[0_40px_100px_rgba(0,0,0,0.7)] flex flex-col md:flex-row overflow-hidden min-h-[540px]"
      >
        {/* App Sidebar */}
        <div className="w-full md:w-[220px] bg-[#0F0F1A] border-b md:border-b-0 md:border-r border-white/[0.06] p-6 flex flex-col justify-between shrink-0">
          <div className="flex flex-col gap-6">
            {/* Sidebar Brand */}
            <div className="flex items-center gap-2">
              <span className="text-[16px] font-bold text-[#F5F4F0] tracking-[-0.3px]">
                Noteflow
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C6FFF] shadow-[0_0_6px_#7C6FFF]" />
            </div>

            {/* Nav Links */}
            <div className="flex flex-col gap-1 text-[13px]">
              {[
                { label: 'All Notes', icon: FileText },
                { label: 'Recent', icon: Clock },
                { label: 'Starred', icon: Star },
                { label: 'Trash', icon: Trash2 },
              ].map(({ label, icon: Icon }) => {
                const isActive = activeNav === label && !activeTag;
                return (
                  <button
                    key={label}
                    onClick={() => {
                      setActiveNav(label);
                      setActiveTag(null);
                    }}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-[8px] font-medium transition-colors cursor-pointer text-left ${
                      isActive
                        ? 'text-[#9B8FFF] bg-[#7C6FFF]/15'
                        : 'text-[#F5F4F0]/50 hover:text-[#F5F4F0]/80 hover:bg-white/[0.03]'
                    }`}
                  >
                    <Icon size={15} />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tags Section */}
            <div className="flex flex-col gap-2 pt-2">
              <span className="text-[10px] font-semibold text-[#F5F4F0]/30 tracking-[0.1em] uppercase px-3">
                TAGS
              </span>
              <div className="flex flex-col gap-0.5 text-[12px]">
                {tagsList.map((tag) => {
                  const isSelected = activeTag === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => setActiveTag(isSelected ? null : tag)}
                      className={`px-3 py-1.5 rounded-[6px] text-left transition-colors cursor-pointer font-normal truncate ${
                        isSelected
                          ? 'text-[#9B8FFF] bg-[#7C6FFF]/20 font-medium'
                          : 'text-[#F5F4F0]/40 hover:text-[#F5F4F0]/80 hover:bg-white/[0.03]'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sync indicator at bottom of sidebar */}
          <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2 text-[11px] text-[#F5F4F0]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3DD68C] shadow-[0_0_6px_#3DD68C]" />
            <span>Synced 48 notes</span>
          </div>
        </div>

        {/* App Main Content Area */}
        <div className="flex-1 flex flex-col bg-[#141420] min-w-0">
          {/* Top Bar */}
          <div className="h-[64px] border-b border-white/[0.06] px-6 flex items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-[340px] flex items-center">
              <Search
                size={14}
                className="absolute left-3 text-[#F5F4F0]/35 pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes…"
                className="w-full h-[36px] bg-white/[0.04] border border-white/[0.06] rounded-[8px] pl-9 pr-8 text-[13px] text-[#F5F4F0] placeholder-[#F5F4F0]/30 focus:outline-none focus:border-[#7C6FFF]/50 focus:bg-white/[0.06] transition-all"
              />
              <span className="absolute right-3 text-[11px] text-[#F5F4F0]/30 font-mono">
                ⌘
              </span>
            </div>

            {/* New Note Button */}
            <motion.button
              onClick={handleCreateNote}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 bg-[#7C6FFF] hover:bg-[#8e82ff] text-white text-[13px] font-medium rounded-[8px] flex items-center gap-1.5 shadow-[0_0_16px_rgba(124,111,255,0.4)] transition-all cursor-pointer"
            >
              <Plus size={14} />
              <span>New Note</span>
            </motion.button>
          </div>

          {/* Notes Grid */}
          <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 auto-rows-max overflow-y-auto max-h-[540px]">
            <AnimatePresence>
              {filteredNotes.map((note) => {
                const isSelected = selectedNoteId === note.id;
                return (
                  <motion.div
                    key={note.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: [0.44, 0, 0.56, 1] }}
                    onClick={() => setSelectedNoteId(note.id)}
                    whileHover={{ scale: 1.02 }}
                    style={{ backgroundColor: note.bg }}
                    className={`relative rounded-[10px] p-4 flex flex-col justify-between min-h-[160px] cursor-pointer select-none transition-all shadow-[0_8px_16px_rgba(0,0,0,0.2)] ${
                      isSelected
                        ? 'ring-2 ring-[#7C6FFF] shadow-[0_0_20px_rgba(124,111,255,0.3)]'
                        : 'border border-black/[0.04]'
                    }`}
                  >
                    <div>
                      {/* Note Header */}
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: note.dotColor }}
                        />
                        <span
                          className="text-[10px] font-normal"
                          style={{ color: `${note.textColor}80` }}
                        >
                          {note.date}
                        </span>
                      </div>

                      {/* Note Title */}
                      <h4
                        className="text-[13px] font-semibold leading-[1.3] tracking-[-0.2px] mb-1.5"
                        style={{ color: note.textColor }}
                      >
                        {note.title}
                      </h4>

                      {/* Note Preview */}
                      <p
                        className="text-[11px] font-normal leading-[1.6] line-clamp-2"
                        style={{ color: `${note.textColor}b3` }}
                      >
                        {note.preview}
                      </p>
                    </div>

                    {/* Note Tag */}
                    <div className="pt-3">
                      <span
                        className="text-[10px] font-medium"
                        style={{ color: note.tagColor }}
                      >
                        {note.tag}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
