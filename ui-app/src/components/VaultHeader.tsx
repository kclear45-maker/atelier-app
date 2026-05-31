import woodHeader from '@material/wood.png'
import goldPlaque from '@material/gold.png'
import { VAULT_HEADER_LABEL } from '../constants/vaultHeader'

/** 保管庫 — wood + gold 素材のヘッダー（screenshot/atelier.PNG 中央） */
export default function VaultHeader() {
  return (
    <header className="vault-header">
      <div className="vault-header__grid">
        <img
          src={woodHeader}
          alt=""
          aria-hidden
          draggable={false}
          className="vault-header__wood"
        />
        <div className="vault-header__plaque-wrap">
          <div className="vault-header__plaque">
            <img
              src={goldPlaque}
              alt=""
              aria-hidden
              draggable={false}
              className="vault-header__plaque-bg"
            />
            <p className="vault-header__label">{VAULT_HEADER_LABEL}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
