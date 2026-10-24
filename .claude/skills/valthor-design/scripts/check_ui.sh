#!/usr/bin/env bash
# Lists banned UI patterns (see SKILL.md "Banned") in the given files or folders.
# Usage: scripts/check_ui.sh src/app/(dashboard)/chats  [more paths...]
#        scripts/check_ui.sh $(git diff --name-only main -- '*.tsx' '*.astro' '*.css')
# Exit code 1 if anything is found, so it can run in CI on changed files.
set -u
# UTF-8 so the emoji and accent patterns compare characters, not bytes ("Cargá" is not an emoji).
export LC_ALL=C.UTF-8 2>/dev/null || export LC_ALL=en_US.UTF-8
if [ "$#" -eq 0 ]; then echo "usage: $0 <file-or-dir> [...]"; exit 2; fi

PATTERNS=(
  'bg-gradient-|text-gradient-|bg-app\b|linear-gradient|radial-gradient::gradient (only the logo may have one)'
  'shadow-float|shadow-(sm|md|lg|xl|2xl)\b|ring-foreground/::card shadow or ring (use tone; shadow-flotante only for floating things)'
  'hover:-translate-y|hover:scale-|perspective|translateZ::hover lift / 3D'
  'animate-pulse-dot|animate-ping::decorative motion'
  'backdrop-blur::glass effect'
  'uppercase::uppercase label (use sentence case)'
  'tracking-(wide|wider|widest|\[0\.)::wide tracking eyebrow'
  'text-\[[0-9.]+(px|rem)\]::arbitrary font size (use the type utilities: titulo, cuerpo, chico...)'
  'rounded-\[[0-9]+px\]|rounded-(2xl|3xl)\b::arbitrary radius (use rounded-full/fila/burbuja/panel/hoja)'
  '(text|bg|border|ring|fill|stroke)-(red|green|amber|yellow|orange|blue|purple|violet|fuchsia|pink|emerald|lime|sky|indigo|rose|slate|gray|zinc|neutral|stone)-[0-9]{2,3}::raw Tailwind palette color (use tokens)'
  '#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b::hex color in component (use tokens)'
  'Sparkles::Sparkles icon as AI marker'
  '→::arrow appended to text'
  '[🎁👥📝🎂🔥🌤❄🏷✨🚀💡📊]::emoji in UI'
  '\b(Selecciona|Activa|Tienes|Puedes|Haz clic|Ingresa|Elige)\b::tuteo in copy (use voseo)'
)

found=0
for entry in "${PATTERNS[@]}"; do
  pat="${entry%%::*}"; label="${entry##*::}"
  out=$(grep -rnE --include='*.tsx' --include='*.ts' --include='*.jsx' --include='*.astro' --include='*.css' --include='*.html' "$pat" "$@" 2>/dev/null | grep -v 'tokens.css' | grep -v '/logos/')
  if [ -n "$out" ]; then
    found=1
    count=$(printf '%s\n' "$out" | wc -l | tr -d ' ')
    echo "== $label ($count)"
    printf '%s\n' "$out" | head -20
    echo
  fi
done

if [ "$found" -eq 0 ]; then echo "check_ui: clean"; else exit 1; fi
