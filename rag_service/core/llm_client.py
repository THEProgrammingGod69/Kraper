"""
Cloud LLM Client Abstraction

Provides a unified interface for different cloud LLM providers.
Supports: Groq, Together AI, Fireworks AI, and OpenAI.

All providers use OpenAI-compatible API format for LLaMA 3.
"""

import os
from openai import OpenAI

class CloudLLMClient:
    """
    Abstraction layer for cloud LLM APIs
    
    This class handles API key management and provides a consistent
    interface regardless of the provider.
    """
    
    def __init__(self, provider=None):
        """
        Initialize the LLM client
        
        Args:
            provider (str): One of 'groq', 'together', 'fireworks', 'openai'
        """
        self.provider = provider or os.getenv('LLM_PROVIDER', 'groq')
        self.client = self._initialize_client()
        self.model_name = self._get_model_name()
        
        print(f"🤖 LLM Client initialized: {self.provider} ({self.model_name})")
    
    def _initialize_client(self):
        """
        Initialize the OpenAI-compatible client based on provider
        """
        provider_configs = {
            'groq': {
                'api_key': os.getenv('GROQ_API_KEY'),
                'base_url': 'https://api.groq.com/openai/v1'
            },
            'together': {
                'api_key': os.getenv('TOGETHER_API_KEY'),
                'base_url': 'https://api.together.xyz/v1'
            },
            'fireworks': {
                'api_key': os.getenv('FIREWORKS_API_KEY'),
                'base_url': 'https://api.fireworks.ai/inference/v1'
            },
            'openai': {
                'api_key': os.getenv('OPENAI_API_KEY'),
                'base_url': None  # Uses default OpenAI endpoint
            }
        }
        
        if self.provider not in provider_configs:
            raise ValueError(f"Unsupported provider: {self.provider}")
        
        config = provider_configs[self.provider]
        
        if not config['api_key']:
            raise ValueError(f"API key not found for {self.provider}. Set {self.provider.upper()}_API_KEY in .env")
        
        # Initialize OpenAI client with provider-specific config
        if config['base_url']:
            return OpenAI(api_key=config['api_key'], base_url=config['base_url'])
        else:
            return OpenAI(api_key=config['api_key'])
    
    def _get_model_name(self):
        """
        Get the model identifier for the provider
        """
        # Allow override from env variable
        custom_model = os.getenv('MODEL_NAME')
        if custom_model:
            return custom_model
        
        # Default models for each provider (LLaMA 3 8B)
        default_models = {
            'groq': 'llama-3.1-8b-instant',
            'together': 'meta-llama/Llama-3-8b-chat-hf',
            'fireworks': 'accounts/fireworks/models/llama-v3-8b-instruct',
            'openai': 'gpt-3.5-turbo'  # Fallback
        }
        
        return default_models.get(self.provider, 'llama3-8b-8192')
    
    def generate(self, system_prompt, user_prompt, max_tokens=1000, temperature=0.3):
        """
        Generate text using the configured LLM
        
        Args:
            system_prompt (str): System message for conditioning
            user_prompt (str): The actual generation prompt
            max_tokens (int): Maximum tokens to generate
            temperature (float): Sampling temperature (0.0 = deterministic)
        
        Returns:
            str: Generated text
        """
        try:
            print(f"🔄 Calling {self.provider} API...")
            print(f"   Model: {self.model_name}")
            print(f"   Max tokens: {max_tokens}")
            print(f"   Temperature: {temperature}")
            
            response = self.client.chat.completions.create(
                model=self.model_name,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                max_tokens=max_tokens,
                temperature=temperature,
                top_p=0.9,
                frequency_penalty=0.0,
                presence_penalty=0.0
            )
            
            generated_text = response.choices[0].message.content
            
            # Log usage statistics if available
            if hasattr(response, 'usage'):
                print(f"✓ Tokens used: {response.usage.total_tokens}")
                print(f"   - Prompt: {response.usage.prompt_tokens}")
                print(f"   - Completion: {response.usage.completion_tokens}")
            
            return generated_text
            
        except Exception as e:
            print(f"❌ LLM API Error: {str(e)}")
            raise Exception(f"Failed to generate text from {self.provider}: {str(e)}")
    
    def get_provider_info(self):
        """
        Returns information about the current configuration
        """
        return {
            'provider': self.provider,
            'model': self.model_name,
            'base_url': getattr(self.client, 'base_url', 'default')
        }


# Singleton instance (optional, for efficiency)
_llm_client_instance = None

def get_llm_client():
    """
    Returns a singleton instance of the LLM client
    """
    global _llm_client_instance
    if _llm_client_instance is None:
        _llm_client_instance = CloudLLMClient()
    return _llm_client_instance
