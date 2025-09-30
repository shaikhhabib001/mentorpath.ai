import React, { useState, useRef, useEffect } from 'react'
import { Send, User, Bot, Mic, Square, RotateCcw } from 'lucide-react'
import { useChatbot } from '../../hooks/useChatbot'

const Chatbot = () => {
  const {
    loading,
    error,
    messages,
    // sessionId,
    sendMessage,
    clearChat,
    cancelRequest,
    clearError
  } = useChatbot()

  const [inputMessage, setInputMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (error) {
      // Auto-clear error after 5 seconds
      const timer = setTimeout(() => {
        clearError()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error, clearError])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim() || loading) return

    const message = inputMessage.trim()
    setInputMessage('')
    
    try {
      await sendMessage(message, {
        interviewType: 'technical',
        difficulty: 'mid'
      })
    } catch (err) {
      // Error is handled by the hook
      console.error('Failed to send message:', err)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    }
  }

  const quickQuestions = [
    "Can we practice React interview questions?",
    "I need help with behavioral questions",
    "Let's do a mock technical interview",
    "How do I answer 'Tell me about yourself'?",
    "What are common system design questions?"
  ]

  const handleQuickQuestion = (question) => {
    setInputMessage(question)
    // Focus input after setting question
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg border border-gray-200">
      {/* Chat Header */}
      <div className="bg-mentor-blue text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-mentor-teal rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">AI Interview Coach</h3>
              <p className="text-sm opacity-90">
                {loading ? 'Thinking...' : 'Online • Ready to help you practice'}
              </p>
            </div>
          </div>
          {messages.length > 1 && (
            <button
              onClick={clearChat}
              className="flex items-center space-x-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition text-sm"
              title="Start new conversation"
            >
              <RotateCcw className="w-4 h-4" />
              <span>New Chat</span>
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center h-full flex items-center justify-center">
            <div className="max-w-md">
              <div className="w-16 h-16 bg-mentor-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-mentor-teal" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ready for Interview Practice?
              </h3>
              <p className="text-gray-600 mb-6">
                I can help you practice technical questions, behavioral interviews, 
                or provide feedback on your answers. What would you like to work on?
              </p>
              
              {/* Quick Questions */}
              <div className="grid grid-cols-1 gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="text-left p-3 rounded-lg border border-gray-200 hover:border-mentor-teal hover:bg-mentor-teal/5 transition text-sm text-gray-700 bg-white"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-4 ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!message.isUser && (
                <div className="w-8 h-8 bg-mentor-teal rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              <div
                className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                  message.isUser
                    ? 'bg-mentor-blue text-white rounded-br-none'
                    : message.isError
                    ? 'bg-red-100 text-red-800 border border-red-200 rounded-bl-none'
                    : 'bg-white text-gray-800 rounded-bl-none shadow border'
                }`}
              >
                {message.text}
                <div className={`text-xs mt-2 ${
                  message.isUser ? 'text-blue-200' : 
                  message.isError ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              {message.isUser && (
                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center ml-2 flex-shrink-0">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))
        )}
        
        {loading && (
          <div className="flex mb-4">
            <div className="w-8 h-8 bg-mentor-teal rounded-full flex items-center justify-center mr-2">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white rounded-lg rounded-bl-none shadow border p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Error Display */}
      {error && (
        <div className="mx-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-2 text-red-800 text-sm">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
          <button
            onClick={clearError}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Input Form */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message or question..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-24 focus:outline-none focus:ring-2 focus:ring-mentor-teal resize-none"
              disabled={loading}
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
              <button
                type="button"
                onClick={() => setIsRecording(!isRecording)}
                className={`p-2 rounded ${
                  isRecording 
                    ? 'text-red-600 bg-red-100' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
                disabled={loading}
              >
                {isRecording ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              
              {loading && (
                <button
                  type="button"
                  onClick={cancelRequest}
                  className="p-2 rounded text-gray-400 hover:text-red-600 hover:bg-red-100"
                >
                  <Square className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={loading || !inputMessage.trim()}
            className="bg-mentor-teal text-white rounded-lg p-3 hover:bg-[#0EA271] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        
        {/* Quick Actions */}
        {messages.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {quickQuestions.slice(0, 3).map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition"
                disabled={loading}
              >
                {question}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Chatbot