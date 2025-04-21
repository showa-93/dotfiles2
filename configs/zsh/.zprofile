# brew
export PATH="/opt/homebrew/bin:$PATH"
eval "$(/opt/homebrew/bin/brew shellenv)"

# mise
eval "$(mise activate zsh --shims)"
eval "$(mise activate zsh)"

# oh-my-posh
eval "$(oh-my-posh init zsh --config ~/.theme.omp.json)"

# bun
[ -s "$HOME/.bun/_bun" ] && source "$HOME/.bun/_bun" # completions
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

if [ -f ~/.zshrc ]; then
  source ~/.zshrc
fi
