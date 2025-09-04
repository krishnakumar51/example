import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Paperclip, ShoppingCart, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';

interface Message {
    id: string;
    content: string;
    role: 'user' | 'ai';
    timestamp: Date;
}

const ChatSessoinInterface = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const { id } = useParams();
    const location = useLocation();

    async function get_user_session() {
        const res = await fetch(`http://localhost:8000/api/users/get-session/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        const resData = await res.json()

        setMessages(resData.chats)
    }

    async function create_new_session(message: string) {
        await fetch("http://localhost:8000/api/users/create-session", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message, session_id: id }),
            credentials: 'include'
        })
    }

    async function update_chat_session(message: string, userMessage: Message) {

        try {
            setMessages(prev => [...prev, userMessage]);

            await fetch(`http://localhost:8000/api/users/update-session/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ role: 'user', content: message }),
                credentials: 'include'
            })
        } catch (e) {
            console.log('Failed to send query.')
            toast.error("Failed to send query to agent", {
                theme: "colored"
            })
            setMessages(prev => prev.slice(0, prev.length-1))
        }
    }

    useEffect(() => {
        const get_session_status = sessionStorage.getItem("is_new_session")
        if (get_session_status === "true") {
            console.log("new session")
            const message = sessionStorage.getItem("message")
            handleRedirectSendMessage(message)
            create_new_session(message)
            sessionStorage.removeItem("message")
            sessionStorage.removeItem("is_new_session")
        }
        else {
            get_user_session()
        }
    }, [location])

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleRedirectSendMessage = (message: string) => {
        if (message.trim()) {

            const userMessage: Message = {
                id: Date.now().toString(),
                content: message,
                role: 'user',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, userMessage]);
            setInputValue('');

            // Simulate AI response
            setTimeout(() => {
                const aiMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    content: 'This is AI replying to your message',
                    role: 'ai',
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, aiMessage]);
            }, 1000);
        }
    };

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            console.log("set messages")
            const userMessage: Message = {
                id: Date.now().toString(),
                content: inputValue,
                role: 'user',
                timestamp: new Date()
            };

            update_chat_session(inputValue, userMessage)

            setInputValue('');

            // Simulate AI response
            // setTimeout(() => {
            //     const aiMessage: Message = {
            //         id: (Date.now() + 1).toString(),
            //         content: 'This is AI replying to your message',
            //         role: 'ai',
            //         timestamp: new Date()
            //     };
            //     setMessages(prev => [...prev, aiMessage]);
            // }, 1000);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    return (
        <div className="flex flex-col h-screen bg-chat-background">
            {/* Chat Messages Area */}
            <ToastContainer />
            <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto px-4 py-6 space-y-6 max-w-4xl mx-auto w-full"
            >
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex items-start gap-3 animate-fade-in ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                            }`}
                    >
                        {/* Avatar */}
                        <Avatar className={`w-10 h-10 ${message.role === 'ai'
                            ? 'bg-chat-ai-bubble'
                            : 'bg-gradient-user'
                            }`}>
                            <AvatarFallback className={`${message.role === 'ai'
                                ? 'bg-chat-ai-bubble text-chat-ai-text'
                                : 'bg-gradient-user text-chat-user-text'
                                }`}>
                                {message.role === 'ai' ? (
                                    <ShoppingCart className="w-5 h-5" />
                                ) : (
                                    <User className="w-5 h-5" />
                                )}
                            </AvatarFallback>
                        </Avatar>

                        {/* Message Content */}
                        <div className={`flex flex-col max-w-[60%] ${message.role === 'user' ? 'items-end' : 'items-start'
                            }`}>
                            {/* role Name & Title */}
                            {message.role === 'ai' && (
                                <div className="mb-2">
                                    <h3 className="text-foreground font-medium">WebScraper AI</h3>
                                </div>
                            )}

                            {/* Message Bubble */}
                            <div
                                className={`px-4 py-3 rounded-2xl ${message.role === 'user'
                                    ? 'bg-gradient-user text-chat-user-text rounded-br-md shadow-glow'
                                    : 'bg-transparent text-foreground'
                                    }`}
                            >
                                <p className="text-sm leading-relaxed">{message.content}</p>
                            </div>

                            {/* Timestamp */}
                            {/* {message.role === 'user' && (
                                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                    <span>{formatTime(message.timestamp)}</span>
                                </div>
                            )} */}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="sticky bottom-0 bg-chat-background p-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 bg-chat-input-bg rounded-2xl p-3 shadow-elevated">
                        {/* Attachment Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-foreground h-8 w-8"
                        >
                            <Paperclip className="w-4 h-4" />
                        </Button>

                        {/* Input Field */}
                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Message WebScraper AI..."
                            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground"
                        />

                        {/* Send Button */}
                        <Button
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim()}
                            size="icon"
                            className="bg-gradient-send hover:bg-gradient-send/90 text-chat-user-text h-8 w-8 rounded-xl shadow-glow disabled:opacity-50 disabled:shadow-none"
                        >
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatSessoinInterface;