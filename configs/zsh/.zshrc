# bun completions
[ -s "/Users/showa/.bun/_bun" ] && source "/Users/showa/.bun/_bun"

# zsh-autosuggestions
source $(brew --prefix)/share/zsh-autosuggestions/zsh-autosuggestions.zsh
source $(brew --prefix)/share/zsh-autocomplete/zsh-autocomplete.plugin.zsh

# zstyle
# _expandを削除
zstyle ':completion:*' completer _complete _complete:-fuzzy _correct _approximate _ignored
# tabで選択
bindkey '^I'               menu-select
bindkey "$terminfo[kcbt]"  menu-select
