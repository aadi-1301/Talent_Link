import { useState, useEffect, useRef } from "react";
import { Send, User as UserIcon, Search, Image as ImageIcon, Clock, X } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Messages({ user }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isTemporary, setIsTemporary] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await api.get("/conversations");
        setConversations(res.data);
        const userId = searchParams.get("user");
        if (userId) {
          const match = res.data.find((u) => u.id === Number(userId));
          if (match) {
            setSelectedUser(match);
          } else {
            // User not in conversations list - fetch user details directly
            try {
              const userRes = await api.get(`/users/${userId}`);
              const userData = userRes.data;
              // Create a temporary conversation object for this user
              const tempUser = {
                id: userData.id,
                user_id: userData.id,
                name: userData.name,
                role: userData.role,
                last_message: null,
                unread_count: 0,
                is_online: false
              };
              setSelectedUser(tempUser);
              // Don't add to conversations list yet - will be added after first message
            } catch (userErr) {
              console.error("Error fetching user details:", userErr);
              // If user fetch fails, fall back to first conversation
              if (res.data.length > 0) {
                setSelectedUser(res.data[0]);
                navigate(`/messages?user=${res.data[0].id}`);
              }
            }
          }
        } else if (res.data.length > 0) {
          setSelectedUser(res.data[0]);
          navigate(`/messages?user=${res.data[0].id}`);
        }
      } catch (err) {
        console.error("Error fetching conversations:", err);
      }
    };
    fetchConversations();
  }, [searchParams, navigate]);

  const fetchMessages = async () => {
    if (!selectedUser) return;
    try {
      setIsLoading(true);
      const res = await api.get(`/messages?user_id=${selectedUser.id}`);
      setMessages(
        res.data.map((m) => ({
          ...m,
          is_sender: m.sender_id === user.id,
        }))
      );
    } catch (err) {
      console.error("Error fetching messages:", err);
      // Don't show error to user for polling failures
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedUser?.id) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 3000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser?.id, user.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    const messageContent = newMessage.trim();
    if (!messageContent && !selectedImage) return;
    if (!selectedUser) return;
    if (isSending) return; // Prevent double-sending

    try {
      setIsSending(true);
      
      const messageData = {
        receiver_id: selectedUser.id,
        content: messageContent,
        is_temporary: isTemporary,
      };

      // If image is selected, convert to base64 and send
      if (selectedImage) {
        messageData.message_type = "image";
        messageData.image_url = imagePreview; // In production, upload to cloud storage
      }

      // Optimistically update UI
      const tempMessage = {
        id: `temp-${Date.now()}`,
        content: messageContent,
        message_type: selectedImage ? "image" : "text",
        image_url: imagePreview,
        is_temporary: isTemporary,
        timestamp: new Date().toISOString(),
        is_read: false,
        is_sender: true,
        isSending: true,
      };

      setMessages((prev) => [...prev, tempMessage]);
      setNewMessage("");
      clearImage();
      scrollToBottom();

      // Send to server
      await api.post("/messages", messageData);

      // Refresh messages to get the actual message from server
      await fetchMessages();

      // Refresh conversations to update the last message
      const res = await api.get("/conversations");
      setConversations(res.data);
    } catch (err) {
      console.error("Error sending message:", err);
      // Remove the optimistic message on error
      setMessages((prev) => prev.filter((m) => !m.isSending));
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const filtered = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#121A24] px-6 md:px-20 py-10">
      {/* Page header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Messages
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Chat, collaborate, and stay connected.
        </p>
      </div>

      {/* Chat container */}
      <div className="shadow-xl rounded-2xl overflow-hidden border border-gray-200 dark:border-[#27343F] bg-white dark:bg-[#18212C] flex h-[75vh]">
        {/* Sidebar */}
        <div className="w-80 border-r border-gray-200 dark:border-[#2C3A46] flex flex-col">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-white dark:bg-[#1F2A35] border border-gray-300 dark:border-[#334451] rounded-xl text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 ring-blue-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1 px-2 pb-3">
            {filtered.length ? (
              filtered.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedUser(c);
                    navigate(`/messages?user=${c.id}`);
                  }}
                  className={`flex items-center p-3 rounded-xl cursor-pointer transition ${
                    selectedUser?.id === c.id
                      ? "bg-blue-600/10 border border-blue-500/20"
                      : "hover:bg-gray-100 dark:hover:bg-[#24303C]"
                  }`}
                >
                  <div className="w-10 h-10 bg-gray-200 dark:bg-[#24303C] rounded-full flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-gray-900 dark:text-gray-200 truncate">
                        {c.name}
                      </p>
                      {c.unread_count > 0 && (
                        <span className="ml-2 px-2 py-0.5 text-xs font-bold text-white bg-blue-600 rounded-full">
                          {c.unread_count}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {c.last_message?.content || "No messages yet"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center mt-10 px-4">
                <UserIcon className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                  {searchTerm ? "No matching conversations" : "No conversations yet"}
                </p>
                {!searchTerm && (
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    Start a conversation by sending a message to someone from your projects or contracts
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Chat View */}
        <div className="flex-1 flex flex-col bg-gray-50 dark:bg-[#1A242E]">
          {selectedUser ? (
            <>
              {/* Top bar */}
              <div className="p-4 border-b dark:border-[#2D3B47] flex items-center justify-between bg-white dark:bg-[#18212C]">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-[#24303C] rounded-full flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="ml-3">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900 dark:text-gray-200">
                        {selectedUser.name}
                      </p>
                      {!selectedUser.last_message && messages.length === 0 && (
                        <span className="px-2 py-0.5 text-[10px] font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                          New conversation
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {selectedUser.is_online ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
                
                {/* Temporary message toggle */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsTemporary(!isTemporary)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition ${
                      isTemporary
                        ? "bg-purple-600 text-white"
                        : "bg-gray-200 dark:bg-[#24303C] text-gray-700 dark:text-gray-300"
                    }`}
                    title="Temporary messages disappear after being read"
                  >
                    <Clock className="w-4 h-4" />
                    <span className="hidden sm:inline">Temporary</span>
                  </button>
                </div>
              </div>

              {/* Message area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {isLoading && messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                      <p className="text-gray-500 dark:text-gray-400">Loading messages...</p>
                    </div>
                  </div>
                ) : messages.length ? (
                  messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${m.is_sender ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`px-4 py-2 max-w-[60%] rounded-2xl shadow-md ${
                          m.is_sender
                            ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-br-none"
                            : "bg-white dark:bg-[#24303C] border dark:border-[#334451] text-gray-700 dark:text-gray-200 rounded-bl-none"
                        }`}
                      >
                        {m.message_type === "image" && m.image_url && (
                          <img
                            src={m.image_url}
                            alt="Shared image"
                            className="rounded-lg mb-2 max-w-full h-auto max-h-64 object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              console.error('Failed to load image:', m.image_url);
                            }}
                          />
                        )}
                        {m.content && <p className="whitespace-pre-wrap break-words">{m.content}</p>}
                        <div className="flex items-center gap-2 mt-1">
                          <span className="block text-[10px] opacity-70">
                            {new Date(m.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          {m.is_temporary && (
                            <Clock className="w-3 h-3 opacity-70" title="Temporary message" />
                          )}
                          {m.isSending && (
                            <span className="text-[10px] opacity-70">Sending...</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Send className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-500 dark:text-gray-400 font-medium">No messages yet</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                        Start the conversation by sending a message below
                      </p>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Image preview */}
              {imagePreview && (
                <div className="px-4 py-2 bg-white dark:bg-[#18212C] border-t dark:border-[#2D3B47]">
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-20 w-20 object-cover rounded-lg"
                    />
                    <button
                      onClick={clearImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}

              {/* Input bar */}
              <form
                onSubmit={handleSendMessage}
                className="p-4 bg-white dark:bg-[#18212C] border-t dark:border-[#2D3B47]"
              >
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-2 bg-gray-200 dark:bg-[#1F2A35] text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-[#24303C] transition"
                    title="Attach image"
                  >
                    <ImageIcon className="w-5 h-5" />
                  </button>
                  <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 bg-white dark:bg-[#1F2A35] border border-gray-300 dark:border-[#334451] rounded-xl text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 ring-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={(!newMessage.trim() && !selectedImage) || isSending}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
                  >
                    {isSending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span className="text-sm">Sending...</span>
                      </>
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-col flex-1 items-center justify-center text-gray-500">
              <UserIcon className="h-10 w-10 opacity-40" />
              <p className="mt-2">Select a conversation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
